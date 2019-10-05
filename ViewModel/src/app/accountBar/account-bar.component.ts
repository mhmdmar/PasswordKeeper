import {Component, OnInit} from '@angular/core';
import {AuthService} from '../Services/auth.service';
import {Router} from '@angular/router';
import {routesNames} from '../ViewUtils/Objects/routeNames';
import {User} from '../ViewUtils/Interfaces/User';
import {icons} from '../ViewUtils/Objects/Icons';
import {Icon} from '../ViewUtils/Classes/Icon';

@Component({
  selector: 'app-account-bar',
  templateUrl: './account-bar.component.html',
  styleUrls: ['./account-bar.component.scss']
})


export class AccountBarComponent implements OnInit {
  public user: User;
  public accountInfoVisible = false;
  public arrowIcon: Icon;
  public loginText = 'Login';
  public testID = {
    login: 'login',
    user: 'user',
    userInfo: 'userInfo',
    logout: 'logout',
    arrowIcon: 'arrowIcon'
  };

  constructor(private Auth: AuthService, private router: Router) {
    this.arrowIcon = icons.expand;
  }

  ngOnInit(): void {
    this.Auth.curActiveUserObservable.subscribe((user: User) => {
      this.user = user;
    });
  }

  toggleAccountInfo(): void {
    this.accountInfoVisible = !this.accountInfoVisible;
    this.updateArrowIcon();
  }

  updateArrowIcon(): void {
    this.arrowIcon = this.accountInfoVisible ? icons.collapse : icons.expand;
  }

  signOut(): void {
    this.Auth.signOut();
    this.accountInfoVisible = false;
    this.navigateToLogin();
  }

  navigateToLogin(): void {
    this.router.navigate([routesNames.login]);
  }
}
