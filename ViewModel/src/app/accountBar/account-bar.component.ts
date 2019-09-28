import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {routesNames} from '../Settings/routeNames';
import {User} from '../ViewUtils/Interfaces/User';
import {iconsText} from '../Settings/iconsText';

@Component({
  selector: 'app-account-bar',
  templateUrl: './account-bar.component.html',
  styleUrls: ['./account-bar.component.scss']
})


export class AccountBarComponent implements OnInit {
  public user: User;
  public accountInfoVisible = false;
  private iconsText = iconsText;
  public loginText = 'Login';
  public testID = {
    login: 'login',
    user: 'user',
    userInfo: 'userInfo',
    logout: 'logout',
    arrowIcon:'arrowIcon'
  };

  constructor(private Auth: AuthService, private route: Router) {
  }

  ngOnInit() {
    this.Auth.curActiveUserObservable.subscribe((user) => {
      this.user = user;
    });
  }

  toggleAccountInfo(): void {
    this.accountInfoVisible = !this.accountInfoVisible;
  }

  signOut(): void {
    this.Auth.signOut();
    this.accountInfoVisible = false;
    this.navigateToLogin();
  }

  navigateToLogin() {
    this.route.navigate([routesNames.login]);
  }
}
