import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { User } from '../ViewUtils/Interfaces/User';
import { Response } from '../ViewUtils/Interfaces/Response';
import { TableTemplate } from '../ViewUtils/Interfaces/Templates/TableTemplate';
import { routesNames } from '../ViewUtils/Objects/routeNames';
import { Router } from '@angular/router';
import { icons } from '../ViewUtils/Objects/Icons';

@Component({
    selector: 'app-users-table',
    template: `
        <app-table [template]="template"></app-table>
    `
})
export class UsersTableComponent implements OnInit {
    public users: User[];
    public template: TableTemplate;

    constructor(private Auth: AuthService, private router: Router) {
        this.template = this.getTemplate();
    }

    getTemplate(): TableTemplate {
        return {
            headers: [{ text: 'Email' }, { text: 'Username' }, { text: 'Password' }, { text: 'Permission' }],
            itemsList: [],
            itemsUtils: [
                {
                    Icon: icons.delete,
                    callback: index => this.removeUser(index)
                },
                {
                    Icon: icons.edit,
                    callback: index => this.changeUser(index)
                }
            ],
            chosenIndex: null,
            keyboardShortcuts: [
                {
                    key: ['cmd + del'],
                    label: 'Help',
                    description: 'Remove current password item',
                    command: () => this.removeUser(this.template.chosenIndex),
                    preventDefault: true
                },
                {
                    key: ['cmd + e'],
                    label: 'Change current password item',
                    description: 'Remove current password',
                    command: () => this.changeUser(this.template.chosenIndex),
                    preventDefault: true
                },
                {
                    key: ['up'],
                    label: 'select the above password item',
                    description: 'Remove current password',
                    command: () => {
                        this.template.chosenIndex && this.template.chosenIndex--;
                    },
                    preventDefault: true
                },
                {
                    key: ['down'],
                    label: 'select the below password item',
                    description: 'Remove current password',
                    command: () => {
                        const len: number = this.template.itemsList.length - 1;
                        const chosenIndex = this.template.chosenIndex;
                        chosenIndex !== null && chosenIndex < len && this.template.chosenIndex++;
                    },
                    preventDefault: true
                }
            ]
        };
    }

    ngOnInit(): void {
        this.Auth.getAllUsers((data: Response) => {
            if (data.success) {
                this.template.itemsList = data.response;
            } else {
                this.router.navigate([routesNames.home]);
            }
        }, false);
    }

    changeUser(index?: number): void {
        console.log('Placeholder ', index);
    }

    removeUser(index?: number): void {
        console.log('Placeholder ', index);
    }
}
