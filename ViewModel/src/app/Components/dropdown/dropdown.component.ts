import { Component, Input, OnInit } from '@angular/core';
import { DropdownTemplate } from '../../ViewUtils/Interfaces/Templates/DropdownTemplate';

@Component({
    selector: 'app-dropdown',
    template: `
        <div ngbDropdown class="d-inline-block">
            <button class="invisibleBtn dropdownBtn" id="dropdown" ngbDropdownToggle>
                <span class="app-text-font" *ngIf="template.title" [innerHTML]="template.title"></span>
                <app-icon *ngIf="template.icon" [icon]="template.icon"></app-icon>
            </button>
            <div ngbDropdownMenu aria-labelledby="dropdown" *ngIf="template.options">
                <button ngbDropdownItem *ngFor="let option of template.options" [title]="option.title || ''" (click)="option.callback()">{{ option.value }}</button>
            </div>
        </div>
    `,
    styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
    @Input() template: DropdownTemplate;

    constructor() {}

    ngOnInit() {}
}
