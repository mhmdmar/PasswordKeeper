import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {routesNames} from '../../routesNames';

interface UserData {
  success: boolean;
  result: any;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private signUpText: string;
  private routesNames: any;

  constructor(private Auth: AuthService, private route: Router) {
    this.routesNames = routesNames;
    this.username = this.password = '';
    this.signUpText = 'Click here to signUp';
  }

  public username: string;
  public password: string;

  static logInError() {
    alert('Username or Password are incorrect');
  }

  ngOnInit() {
  }

  login() {
    this.Auth.getUserDetails(this.username, this.password).subscribe((data: UserData) => {
      if (data.success) {
        this.route.navigate([this.routesNames.default]);
        this.Auth.setLoggedIn(true, data.result);
      } else {
        LoginComponent.logInError();
      }
    });
  }

  signUp() {
    this.route.navigate([this.routesNames.signUp]);
  }
}
