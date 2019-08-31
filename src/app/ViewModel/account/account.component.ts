import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {
  private user: any;
  private userSubscription: any;
  private accountInfoVisible = false;

  constructor(private Auth: AuthService, private route: Router) {
    this.user = Auth.user;
  }

  ngOnInit() {
    this.userSubscription = this.Auth.userChange.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  showAccountInfo() {
    this.accountInfoVisible = !this.accountInfoVisible;
  }

  signOut() {
    this.Auth.setLoggedIn(false);
    this.accountInfoVisible = false;
    this.navigateToLogin();
  }

  navigateToLogin() {
    this.route.navigate(['login']);
  }
}
