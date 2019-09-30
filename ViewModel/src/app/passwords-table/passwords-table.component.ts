import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Password} from '../ViewUtils/Interfaces/Password';
import {User} from '../ViewUtils/Interfaces/User';
import {Response} from '../ViewUtils/Interfaces/Response';
import {Router} from '@angular/router';
import {TableTemplate} from '../ViewUtils/Interfaces/Templates/TableTemplate';
import {routesNames} from '../ViewUtils/Objects/routeNames';

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
      headers:
        [
          {text: 'Domain'},
          {text: 'Username'},
          {text: 'Password'},
        ],
      itemsList: [],
      itemsUtils: [
        {
          value: 'delete',
          callback: (index) => this.removePassword(index)
        },
        {
          value: 'edit',
          callback: (index) => this.changePassword(index)
        }
      ],
      chosenIndex: null,
      keyboardShortcuts: [{
        key: ['cmd + del'],
        label: 'Help',
        description: 'Remove current password item',
        command: () => this.removePassword(this.template.chosenIndex),
        preventDefault: true
      },
        {
          key: ['cmd + e'],
          label: 'Change current password item',
          description: 'Remove current password',
          command: () => this.changePassword(this.template.chosenIndex),
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
  };

  ngOnInit() {
    this.Auth.curActiveUserObservable.subscribe((user: User) => {
      this.userPasswordsList = user ? user.passwordsList : [];
      this.template.itemsList = this.userPasswordsList;
    });
  }

  changePassword(index: number): void {
    if (index === null) {
      return;
    }
    this.router.navigate([routesNames.passwordForm.value.split(':')[0], index]);
  }

  removePassword(index: number): void {
    if (index === null) {
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
}
