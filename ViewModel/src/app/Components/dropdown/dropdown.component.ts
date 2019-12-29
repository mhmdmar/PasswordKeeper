import { Component, Input, OnInit } from '@angular/core';
import { DropdownTemplate } from '../../ViewUtils/Interfaces/Templates/DropdownTemplate';
import { icons } from '../../ViewUtils/Objects/Icons';

@Component({
    selector: 'app-dropdown',
    template: `
        <div ngbDropdown class="d-inline-block">
            <button class="invisibleBtn dropdownBtn" [ngClass]="hideShowMoreBtn()" id="dropdown" ngbDropdownToggle>
                <span [attr.test-id]="template.testId" class="app-text-font" *ngIf="template.title" [innerHTML]="template.title"></span>
                <app-icon *ngIf="template.icon" [icon]="template.icon"></app-icon>
            </button>
            <div ngbDropdownMenu aria-labelledby="dropdown" *ngIf="template.options">
                <button ngbDropdownItem class="invisibleBtn" *ngFor="let option of template.options" [title]="option.title || ''" (click)="option.callback()">
                    <app-icon *ngIf="option.icon" [icon]="option.icon"></app-icon>
                    <span class="app-text-font-black" *ngIf="option.value" [innerHTML]="option.value"></span>
                </button>
            </div>
        </div>
    `,
    styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
    @Input() template: DropdownTemplate;

    constructor() {}

    ngOnInit() {}

    hideShowMoreBtn(): string {
        return this.template.icon && this.template.icon === icons.more ? 'hideMenu' : '';
    }
}
