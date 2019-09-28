import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Password} from '../ViewUtils/Interfaces/Password';
import {User} from '../ViewUtils/Interfaces/User';
import {Response} from '../ViewUtils/Interfaces/Response';
import {Router} from '@angular/router';
import {TableTemplate} from '../ViewUtils/Interfaces/TableTemplate';

@Component({
  selector: 'app-passwords-table',
  template: `
      <app-table [template]="template"></app-table>
  `
})
export class PasswordsTableComponent implements OnInit {

  public userPasswordsList: Array<Password>;
  public template: TableTemplate;
  public chosenIndex: number;

  constructor(private Auth: AuthService, private router: Router) {
    this.template = this.getTemplate();
    this.chosenIndex = null;
  }

  getTemplate(): TableTemplate {
    return {
      headers:
        [
          {text: 'Domain'},
          {text: 'Username'},
          {text: 'Password'},
        ],
      rows: [],
      choseItem: (index) => this.chosePassword(index),
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
      chosenIndex: null
    };
  }

  ngOnInit() {
    this.Auth.curActiveUserObservable.subscribe((user: User) => {
      this.userPasswordsList = user ? user.passwordsList : [];
      this.template.rows = this.userPasswordsList;
    });
    this.bindKeyboard();
  }

  chosePassword(index): void {
    this.chosenIndex = index;
  }

  changePassword(index: number): void {

    this.router.navigate(['/passwordChangeForm', index]);
  }

  removePassword(index: number): void {
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

  bindKeyboard() {
  }
}
