import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { User } from '../ViewUtils/Interfaces/User';
import { Response } from '../ViewUtils/Interfaces/Response';
import { TableTemplate } from '../ViewUtils/Interfaces/Templates/TableTemplate';
import { routesNames } from '../ViewUtils/Objects/routeNames';
import { Router } from '@angular/router';
import { icons } from '../ViewUtils/Objects/Icons';
import { generalUtils } from '../ViewUtils/Objects/GeneralUtils';
import { DOMHelper } from '../ViewUtils/Objects/DOM_Utils/DOM_Helper';
import { dateUtils } from '../ViewUtils/Objects/DateUtils';

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
            headers: [{ text: 'username' }, { text: 'password' }, { text: 'email' }, { text: 'permission' }],
            itemsList: [],
            itemsUtils: [
                {
                    Icon: icons.delete,
                    callback: index => this.removeUser(index)
                }
            ],
            chosenIndex: null,
            changeItemCallback: (key: string, newValue: string) => {
                this.changeItem(key, newValue);
            },
            keyboardShortcuts: [
                {
                    key: ['cmd + del'],
                    label: 'Help',
                    description: 'Remove current password item',
                    command: () => this.removeUser(this.template.chosenIndex),
                    preventDefault: true
                }
            ],
            editableByAdmin: true,
            dropdownUtils: {
                icon: icons.more,
                options: [
                    {
                        icon: icons.download,
                        value: 'Download List',
                        title: 'Download List',
                        callback: () => {
                            const csvData = generalUtils.arrayToCSV(this.template.itemsList);
                            DOMHelper.downloadFile(csvData, 'List_' + dateUtils.getDate() + '.csv');
                        }
                    }
                ]
            }
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

    removeUser(index?: number): void {
        const wannaDelete = confirm('Are you sure you want to delete this password');
        if (wannaDelete) {
            const email = this.template.itemsList[index].email;
            this.Auth.removeUser(email, (data: Response) => {
                if (data.success) {
                    this.template.chosenIndex = null;
                    this.template.itemsList.splice(index, 1);
                } else {
                    alert(data.message);
                }
            });
        }
    }

    changeItem(key: string, newValue: string) {
        const index = this.template.chosenIndex;
        const user: User = this.template.itemsList[index];
        const email = user.email; // change might be the email so we save the old value for the sql query
        if (user[key].toString() !== newValue.toString()) {
            const temp = user[key];
            user[key] = newValue;
            this.Auth.updateUser(email, user, (data: Response) => {
                if (!data.success) {
                    user[key] = temp;
                }
            });
        }
    }
}
