import { Component, OnInit } from '@angular/core';
import { sidebarItems } from '../ViewUtils/Objects/sidebar';
import { AuthService } from '../Services/auth.service';
import { User } from '../ViewUtils/Interfaces/User';
import { Icon } from '../ViewUtils/Classes/Icon';
import { icons } from '../ViewUtils/Objects/Icons';
import { EventsService } from '../Services/events.service';
import { SidebarItem } from '../ViewUtils/Interfaces/SidebarItem';
import { ComponentsEvents } from '../ViewUtils/Interfaces/ComponentsEvents';

@Component({
    selector: 'app-side-bar',
    template: `
        <ul class="flex-container sidebarContainer column">
            <ng-container *ngFor="let data of filterSidebar()">
                <li class="flex-item sidebar-item" *ngIf="!data.adminUser || (data.adminUser && Auth.isAdminUser())" [routerLink]="navigate(data.route)" routerLinkActive="active-link">
                    <app-icon *ngIf="data.Icon" [icon]="data.Icon"></app-icon>
                    <span *ngIf="sidebarVisible" class="app-text-font sidebar-text" [innerText]="data.title"></span>
                </li>
            </ng-container>
        </ul>
    `,
    styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
    public curUserPermission: number;
    public sidebarVisible: boolean;
    public toggleSidebarIcon: Icon;

    constructor(private Auth: AuthService, private eventService: EventsService) {
        this.sidebarVisible = true;
        this.toggleSidebarIcon = icons.toggleSidebar;
    }

    ngOnInit(): void {
        this.Auth.curActiveUserObservable.subscribe((user: User) => {
            this.curUserPermission = user ? user.permission : 3;
        });
        this.eventService.currentEventObservable.subscribe((event: ComponentsEvents) => {
            if (!event) {
                return;
            }
            const componentName = event.component;
            const functionName = event.eventFunction;
            if (componentName === 'sidebar') {
                functionName === 'toggleSidebar' && this.toggleSidebar();
            }
        });
    }

    filterSidebar(): SidebarItem[] {
        // filter the sidebar for unauthorized users
        return sidebarItems.filter(field => !field.requireLogin || this.Auth.loggedIn);
    }

    toggleSidebar(): void {
        this.sidebarVisible = !this.sidebarVisible;
    }

    navigate(route: string): string[] | string {
        const routeParts = route.split(':');
        const navigate: string[] = [routeParts[0]];
        routeParts.length > 1 && navigate.push('');
        return navigate;
    }
}
