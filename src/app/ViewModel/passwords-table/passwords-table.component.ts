import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Password} from '../ViewUtils/Interfaces/Password';
import {User} from '../ViewUtils/Interfaces/User';
import {Response} from '../ViewUtils/Interfaces/Response';

@Component({
  selector: 'app-passwords-table',
  templateUrl: './passwords-table.component.html',
  styleUrls: ['./passwords-table.component.scss']
})
export class PasswordsTableComponent implements OnInit {

  public userPasswordsList: Array<Password>;
  public chosenIndex: number;

  constructor(private Auth: AuthService) {
  }

  ngOnInit() {
    this.Auth.curActiveUserObservable.subscribe((user: User) => {
      this.userPasswordsList = user ? user.passwordsList : [];
    });
  }

  chosePassword(index): void {
    this.chosenIndex = index;
  }

  changeText(): void {
  }

  removePassword(): void {
    const wannaDelete = confirm('Are you sure you want to delete this password');
    if (wannaDelete) {
      this.Auth.removePassword(this.chosenIndex, (data: Response) => {
        if (data.success) {
          this.chosenIndex = this.chosenIndex > 0 ? this.chosenIndex - 1 : 0;
        } else {
          alert(data.message);
        }
      });
    }
  }
}
