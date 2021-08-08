import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

interface MatchDetailResponse {
    head2head: {},
    match: {},
}

@Component({
    selector: 'app-match',
    templateUrl: './match.component.html',
    styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
    matchId = null

    match: any = {}

    activeTab = 'timeline'

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.matchId = params['id'];
        });

        // The token should go to an env file of some sort but
        this.http.get<MatchDetailResponse>(`http://api.football-data.org/v2/matches/${this.matchId}`, {
            headers: {
                'X-Auth-Token': 'e8db5165dd4b468c81a4ac50e06b56f8'
            }
        }).subscribe(data => {
            this.match = data.match
        })
    }

    validMatch(): boolean {
        return !! Object.keys(this.match).length
    }

    getMatch() {
        return this.match
    }

    getGoals(teamId: number): string[] {
        if (! this.match.goals) {
            return []
        }

        let goals = this.match.goals.filter((goal: any,{}) => goal.team.id == teamId)

        return goals.map((goal: any,{}) => {
            let time = goal.extraTime ? `${goal.minute}+${goal.extraTime}` : goal.minute

            return `${goal.scorer.name} ${time}'`
        })
    }

    hasGoals(): boolean {
        return this.match.hasOwnProperty('goals') && this.match.goals.length > 0
    }

    hasEvents(): boolean {
        return this.hasGoals() && this.match.hasOwnProperty('bookings') && this.match.hasOwnProperty('substitutions')
    }

    hasLineup(): boolean {
        return this.match.homeTeam.hasOwnProperty('lineup') && this.match.awayTeam.hasOwnProperty('lineup')
    }

    getEvents(): any[] {
        let score = {
            [this.match.homeTeam.name]: 0,
            [this.match.awayTeam.name]: 0,
        }

        let goals = this.match.goals.map((goal: any,{}) => {
            score[goal.team.name] += 1

            return {
                type: 'goal',
                minute: goal.minute,
                extraTime: goal.extraTime,
                team: goal.team.name,
                player: goal.scorer.name,
                home: score[this.match.homeTeam.name],
                away: score[this.match.awayTeam.name],
                isHomeTeam: this.match.homeTeam.name == goal.team.name
            }
        })

        let bookings = this.match.bookings.map((booking: any,{}) => {
            return {
                type: 'booking',
                minute: booking.minute,
                card: booking.card == 'YELLOW_CARD' ? 'Yellow card' : 'Red card',
                team: booking.team.name,
                player: booking.player.name
            }
        })

        let substitutions = this.match.substitutions.map((substitution: any,{}) => {
            return {
                type: 'substitution',
                minute: substitution.minute,
                team: substitution.team.name,
                in: substitution.playerIn.name,
                out: substitution.playerOut.name,
            }
        })

        let events: any[] = []

        return events.concat(goals).concat(substitutions).concat(bookings).sort((a,b) => {
            if (a.minute < b.minute) {
                return 1;
            }

            if (a.minute > b.minute) {
                return -1;
            }

            return 0;
        })
    }

    getDate(): string {
        return moment(this.match.utcDate).utc().format('MM.DD.,dd')
    }
}
