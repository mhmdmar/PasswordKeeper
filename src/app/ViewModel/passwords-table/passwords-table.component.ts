import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Password} from '../ViewUtils/Interfaces/Password';
import {User} from '../ViewUtils/Interfaces/User';

@Component({
  selector: 'app-passwords-table',
  templateUrl: './passwords-table.component.html',
  styleUrls: ['./passwords-table.component.scss']
})
export class PasswordsTableComponent implements OnInit {

  public userPasswordsList: Array<Password>;

  constructor(private Auth: AuthService) {
  }

  ngOnInit() {
    this.Auth.curActiveUserObservable.subscribe((user: User) => {
      this.userPasswordsList = user ? user.passwordsList : [];
    });
  }

  changeText(): void {
    console.log('Place Holder');
  }

}
