import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {routesNames} from '../../routeNames';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../CSS/form.scss', './signup.component.scss']
})
export class SignupComponent implements OnInit {

  public loginText: string;
  public email: string;
  public username: string;
  public password: string;
  public confirmPassword: string;

  constructor(private Auth: AuthService, private route: Router) {
    this.email = this.username = this.password = this.confirmPassword = '';
    this.loginText = 'click to Login';
  }

  static signUpError(message): void {
    alert(message);
  }

  static validateInput(inputText: string): boolean {
    let validInput = true;
    if (inputText.length === 0) {
      validInput = false;
    }
    return validInput;
  }

  ngOnInit() {
  }

  signUp(): void {
    const validInputs = this.validateForm();
    if (!validInputs) {
      alert('One or more fields are not valid');
      return;
    }

    this.Auth.registerUserDetails(this.email, this.username, this.password).subscribe((data: any) => {
      if (data.success) {
        this.route.navigate([routesNames.login]);
      } else {
        SignupComponent.signUpError(data.message);
      }
    });
  }

  validateForm(): boolean {
    return SignupComponent.validateInput(this.email) && SignupComponent.validateInput(this.username) &&
      SignupComponent.validateInput(this.password) &&
      SignupComponent.validateInput(this.confirmPassword);
  }

  navigateToLogin(): void {
    this.route.navigate([routesNames.login]);
  }
}
