import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface CompetitionListResponse {
    competitions: any[],
    count: number,
    filters: {}
}

@Component({
    selector: 'app-competition-list',
    templateUrl: './competition-list.component.html',
    styleUrls: ['./competition-list.component.scss']
})

@Injectable()
export class CompetitionListComponent implements OnInit {
    competitions: any[] = []

    areas: any[] = []

    planType: string = 'TIER_ONE'

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.http.get<CompetitionListResponse>('http://api.football-data.org/v2/competitions', {
            params: {
                plan: 'TIER_ONE'
            },
            headers: {
                'X-Auth-Token': 'e8db5165dd4b468c81a4ac50e06b56f8'
            }
        }).subscribe(data => {
            this.competitions = data.competitions

            this.competitions.forEach(competition => {
                let area = this.areas.find(area => area.countryCode == competition.area.countryCode)

                if (!area) {
                    this.areas.push(competition.area)
                }
            })
        })
    }

    getCompetitions(area: any): any[] {
        return this.competitions.filter(competition => competition.area.countryCode == area.countryCode)
    }
}
