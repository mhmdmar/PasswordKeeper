import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {routesNames} from '../Settings/routeNames';
import {FormTemplate} from '../ViewUtils/Interfaces/FormTemplate';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public email: string;
  public username: string;
  public password: string;
  public confirmPassword: string;
  protected formTemplate: FormTemplate;

  constructor(private Auth: AuthService, private route: Router) {
    this.email = this.username = this.password = this.confirmPassword = '';
    this.formTemplate = this.getData();
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

  getData(): FormTemplate {
    return {
      inputs: [
        {
          class: '',
          type: 'text',
          field: 'Email',
          placeholder: 'Email',
          callback: ($event) => this.email = $event.target.value
        },
        {
          class: '',
          type: 'text',
          placeholder: 'Username',
          field: 'Username',
          callback: ($event) => this.username = $event.target.value
        },
        {
          class: 'formInput',
          type: 'password',
          field: 'Password',
          placeholder: 'Password',
          callback: ($event) => this.password = $event.target.value
        },
        {
          class: 'formInput',
          type: 'password',
          field: 'Confirm Password',
          placeholder: 'Confirm Password',
          callback: ($event) => this.confirmPassword = $event.target.value
        },
        {
          class: 'formButton',
          type: 'button',
          value: 'Sign up',
          callback: () => this.signUp()
        }
      ],
      alternativeRoute: {
        alternativeText: 'click to login',
        callback: () => this.route.navigate([routesNames.login])
      },
    };
  }

  ngOnInit() {
  }

  signUp(): void {
    const validateFormMessage = this.validateForm();
    if (!validateFormMessage.valid) {
      alert(validateFormMessage.message);
      return;
    }

    this.Auth.registerUserDetails(this.email, this.username, this.password).subscribe((data: any) => {
      if (data.success) {
        this.route.navigate([routesNames.login]);
      } else {
        SignupComponent.signUpError(data.response);
      }
    });
  }

  emptyInputExists() {
    return this.email === '' || this.username === '' || this.password === '' || this.confirmPassword === '';
  }

  validateForm(): any {
    if (this.emptyInputExists()) {
      return {
        valid: false,
        message: 'Not all fields are filled'
      };
    }
    if (!this.email.includes('@')) {
      return {
        valid: false,
        message: 'The Email address is not legal'
      };
    }
    if (this.password !== this.confirmPassword) {
      return {
        valid: false,
        message: 'Passwords do not match'
      };
    }
    return {
      valid: true,
      message: 'success'
    };
  }
}
