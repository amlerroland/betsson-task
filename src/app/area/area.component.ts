import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
    private _isOpen = false;
    @Input() area: any = {}
    @Input() competitions: any[] = []
    @Input()
    get isOpen(): boolean { return this._isOpen; }
    set isOpen(isOpen: boolean) {
        this._isOpen = isOpen;
    }

    constructor() { }

    ngOnInit(): void {
    }

    getUrl(competition: any): string {
        return '/competitions/' + competition.id
    }
}
