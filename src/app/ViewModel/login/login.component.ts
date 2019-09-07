import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {routesNames} from '../Settings/routeNames';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../CSS/form.scss', './login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private Auth: AuthService, private route: Router) {
    this.username = this.password = '';
    this.submitText = 'click to sign up';
    this.data = this.getData();
  }

  public submitText: string;
  public username: string;
  public password: string;
  public data: any;

  static logInError(): void {
    alert('Username or Password are incorrect');
  }

  getData() {
    return {
      inputs: [
        {
          type: 'text',
          field: 'Username',
          placeholder: 'Username',
          callback: ($event) => this.username = $event.target.value
        },
        {
          type: 'password',
          field: 'Password',
          placeholder: 'Password',
          callback: ($event) => this.password = $event.target.value
        },
        {
          type: 'button',
          value: 'Login',
          callback: () => this.login()
        }
      ],
      alternative: {
        alternativeText: 'click to sign up',
        callback: () => this.route.navigate([routesNames.signUp])
      },
    };
  }

  ngOnInit() {
  }

  login(): void {
    this.Auth.login(this.username, this.password, (data: any) => {
      if (data.success) {
        this.route.navigate([routesNames.passwordTable]);
        this.Auth.loginSuccessfully(data.response);
      } else {
        LoginComponent.logInError();
      }
    });
  }

  signUp(): void {
    this.route.navigate([routesNames.signUp]);
  }
}
