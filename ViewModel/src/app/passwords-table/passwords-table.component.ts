import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Password } from '../ViewUtils/Interfaces/Password';
import { User } from '../ViewUtils/Interfaces/User';
import { Response } from '../ViewUtils/Interfaces/Response';
import { Router } from '@angular/router';
import { TableTemplate } from '../ViewUtils/Interfaces/Templates/TableTemplate';
import { routesNames } from '../ViewUtils/Objects/routeNames';
import { icons } from '../ViewUtils/Objects/Icons';

@Component({
    selector: 'app-passwords-table',
    template: `
        <app-table [template]="template"></app-table>
    `
})
export class PasswordsTableComponent implements OnInit {
    public userPasswordsList: Array<Password>;
    public template: TableTemplate;

    constructor(private Auth: AuthService, private router: Router) {
        this.template = this.getTemplate();
    }

    getTemplate(): TableTemplate {
        return {
            headers: [{ text: 'Domain' }, { text: 'Username' }, { text: 'Password' }],
            tableLength: 10,
            itemsList: [],
            itemsUtils: [
                {
                    Icon: icons.delete,
                    callback: (index: number): void => this.removePassword(index)
                },
                {
                    Icon: icons.edit,
                    callback: (index: number): void => this.changePassword(index)
                }
            ],
            changeItemCallback: (key: string, newValue: string) => {
                this.changePasswordItem(key, newValue);
            },
            chosenIndex: null,
            keyboardShortcuts: [
                {
                    key: ['cmd + del'],
                    description: 'Remove current password item',
                    command: (): void => this.removePassword(this.template.chosenIndex),
                    preventDefault: true
                },
                {
                    key: ['cmd + e'],
                    description: 'Change current password item',
                    command: (): void => this.changePassword(this.template.chosenIndex),
                    preventDefault: true
                }
            ]
        };
    }

    ngOnInit(): void {
        this.Auth.curActiveUserObservable.subscribe((user: User) => {
            this.userPasswordsList = user ? user.passwordsList : [];
            this.template.itemsList = this.userPasswordsList;
        });
    }

    changePassword(index: number): void {
        if (index === undefined || index === null) {
            return;
        }
        this.router.navigate([routesNames.passwordForm.split(':')[0], index]);
    }

    removePassword(index: number): void {
        if (index === undefined || index === null) {
            return;
        }
        const wannaDelete = confirm('Are you sure you want to delete this password');
        if (wannaDelete) {
            this.Auth.removePasswordItem(index, (data: Response) => {
                if (data.success) {
                    this.template.chosenIndex = null;
                } else {
                    alert(data.message);
                }
            });
        }
    }
    changePasswordItem(key: string, newValue: string) {
        const index = this.template.chosenIndex;
        const passwordItem: Password = this.template.itemsList[index];
        if (passwordItem[key].toString() !== newValue.toString()) {
            const temp = passwordItem[key];
            passwordItem[key] = newValue;
            this.Auth.updatePasswordItem(passwordItem.domain, passwordItem.username, passwordItem.password, index, (data: Response) => {
                if (!data.success) {
                    passwordItem[key] = temp;
                }
            });
        }
    }
}
