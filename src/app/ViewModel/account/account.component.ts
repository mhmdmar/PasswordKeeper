import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {
  public user: any;
  public accountInfoVisible = false;
  private loginText: string;

  constructor(private Auth: AuthService, private route: Router) {
    this.loginText = 'Login';
  }

  ngOnInit() {
    this.user = this.Auth.curActiveUser;
  }

  ngOnDestroy() {
  }

  toggleAccountInfo(): void {
    this.accountInfoVisible = !this.accountInfoVisible;
  }

  signOut(): void {
    this.Auth.setLoggedIn(false);
    this.accountInfoVisible = false;
    this.navigateToLogin();
  }

  navigateToLogin() {
    this.route.navigate(['login']);
  }

  void() {
    return null;
  }
}
