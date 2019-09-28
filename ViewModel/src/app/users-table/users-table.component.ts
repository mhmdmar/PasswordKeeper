import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {User} from '../ViewUtils/Interfaces/User';
import {Response} from '../ViewUtils/Interfaces/Response';
import {TableTemplate} from '../ViewUtils/Interfaces/TableTemplate';

@Component({
  selector: 'app-users-table',
  template: `
      <app-table [template]="template"></app-table>
  `
})

export class UsersTableComponent implements OnInit {

  public users: Array<User>;
  private chosenIndex: number;
  public template: TableTemplate;

  constructor(private Auth: AuthService) {
    this.template = this.getTemplate();
  }

  getTemplate(): TableTemplate {
    return {
      headers:
        [
          {text: 'Email'},
          {text: 'Username'},
          {text: 'Password'},
          {text: 'Permission'}
        ],
      rows: [],
      choseItem: (index) => this.choseUser(index),
      itemsUtils: [
        {
          value: 'delete',
          callback: (index) => this.removeUser(index)
        },
        {
          value: 'edit',
          callback: (index) => this.changeUser(index)
        }
      ],
      chosenIndex: null
    };
  }

  ngOnInit() {
    this.Auth.getAllUsers((data: Response) => {
      this.users = data.response;
      this.template.rows = this.users;
    }, false);
  }

  choseUser(index): void {
    this.chosenIndex = index;
  }

  changeUser(index): void {
    console.log('Place holder', index);
  }

  removeUser(index?: number): void {
    // const wannaDelete = confirm('Are you sure you want to delete this password');
    // if (wannaDelete) {
    //   this.Auth.removePasswordItem(this.chosenIndex, (data: Response) => {
    //     if (data.success) {
    //       this.chosenIndex = this.chosenIndex > 0 ? this.chosenIndex - 1 : 0;
    //     } else {
    //       alert(data.message);
    //     }
    //   });
    // }
    console.log('Place holder ', index);
  }
}
