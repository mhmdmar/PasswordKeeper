import { Component, OnInit } from '@angular/core';
import { topBar } from '../ViewUtils/Objects/topbar';
import { icons } from '../ViewUtils/Objects/Icons';
import { Icon } from '../ViewUtils/Classes/Icon';
import { EventsService } from '../Services/events.service';
import { ComponentsEvents } from '../ViewUtils/Interfaces/ComponentsEvents';
import { topBarTemplate } from '../ViewUtils/Interfaces/Templates/topBarTemplate';

@Component({
    selector: 'app-top-bar',
    template: `
        <ul class="top-bar">
            <li class="item item-icon">
                <div class="app-btn" (click)="toggleSidebar()">
                    <app-icon [icon]="toggleSidebarIcon"></app-icon>
                </div>
            </li>
            <li class="item item-app-title">
                <div class="top-bar-title">
                    <span class="app-text-font account-name" [attr.test-id]="testID.topBar" [innerHTML]="title"></span>
                </div>
            </li>
            <li class="item">
                <app-account-bar></app-account-bar>
            </li>
        </ul>
    `,
    styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
    public template: topBarTemplate;
    public title: string;
    public toggleSidebarIcon: Icon;

    public testID = {
        topBar: 'topBar'
    };

    constructor(private eventService: EventsService) {
        this.template = topBar;
        this.title = this.template.title;
        this.toggleSidebarIcon = icons.toggleSidebar;
    }

    ngOnInit(): void {}

    toggleSidebar(): void {
        const message: ComponentsEvents = {
            component: 'sidebar',
            eventFunction: 'toggleSidebar'
        };
        this.eventService.newEvent(message);
    }
}
