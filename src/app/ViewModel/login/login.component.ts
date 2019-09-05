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
  styleUrls: ['../CSS/form.scss', './login.component.scss']
})
export class LoginComponent implements OnInit {
  public signUpText: string;
  public username: string;
  public password: string;

  constructor(private Auth: AuthService, private route: Router) {
    this.username = this.password = '';
    this.signUpText = 'click to sign up';
  }

  static logInError(): void {
    alert('Username or Password are incorrect');
  }

  ngOnInit() {
  }

  login(): void {
    this.Auth.login(this.username, this.password).subscribe((data: UserData) => {
      if (data.success) {
        this.route.navigate([routesNames.default]);
        this.Auth.setLoggedIn(true, data.result);
      } else {
        LoginComponent.logInError();
      }
    });
  }

  signUp(): void {
    this.route.navigate([routesNames.signUp]);
  }
}
