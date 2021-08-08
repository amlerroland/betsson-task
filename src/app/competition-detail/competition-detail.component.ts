import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

interface CompetitionDetailResponse {
    count: number,
    filters: {}
    competition: {}
    matches: any[]
}

@Component({
  selector: 'app-competition-detail',
  templateUrl: './competition-detail.component.html',
  styleUrls: ['./competition-detail.component.scss']
})
export class CompetitionDetailComponent implements OnInit {
    competitionId = ''

    competition: any = {}

    matches: any[] = []

    matchStatus = ''

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.competitionId = params['id'];
        });

        this.getCompetitionDetails()
    }

    getCompetitionDetails(): void {
        // The token should go to an env file of some sort but
        this.http.get<CompetitionDetailResponse>(`https://api.football-data.org/v2/competitions/${this.competitionId}/matches`, {
            params: {
                status: this.matchStatus
            },
            headers: {
                'X-Auth-Token': 'e8db5165dd4b468c81a4ac50e06b56f8'
            }
        }).subscribe(data => {
            this.competition = data.competition
            this.matches = data.matches
        })
    }

    getCompetitionUrl(): string {
        return '/competitions/' + this.competition.id
    }

    getTeamTextColor(match: any, team: string): string {
        try {
            if (match.score.winner === team) {
                return 'text-white'
            }
        } catch (error) {
            return 'text-white'
        }

        return 'text-gray-400'
    }

    getDate(match: any): string {
        return moment(match.utcDate).utc().format('MM.DD.,dd')
    }

    getTime(match: any): string {
        return moment(match.utcDate).utc().format('HH:mm')
    }

    isMatchFinished(match: any): boolean {
        return match.status === 'FINISHED'
    }
}
