import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {routesNames} from '../ViewUtils/Objects/routeNames';
import {FormTemplate} from '../ViewUtils/Interfaces/Templates/FormTemplate';
import {Response} from '../ViewUtils/Interfaces/Response';
import {FormValidation} from '../ViewUtils/Interfaces/FormValidation';
import {inputUtils} from '../ViewUtils/Objects/DOM_Utils/DOM_Elements/Input';
import {icons} from '../ViewUtils/Objects/Icons';

@Component({
  selector: 'app-login',
  template: `
      <app-form [template]="formTemplate"></app-form>
  `
})
export class LoginComponent implements OnInit {

  public submitText: string;
  public username: string;
  public password: string;
  public formTemplate: FormTemplate;
  public testID = {
    usernameInput: 'usernameInput',
    passwordInput: 'passwordInput',
    loginBtn: 'loginBtn',
    signupBtn: 'signupBtn'
  };

  constructor(private Auth: AuthService, private route: Router) {
    this.username = this.password = '';
    this.submitText = 'click to sign up';
    this.formTemplate = this.getData();
  }

  static logInError(message): void {
    alert(message);
  }

  getData(): FormTemplate {
    return {
      inputs: [
        {
          class: 'formInput',
          type: 'text',
          field: 'Username',
          testID: this.testID.usernameInput,
          placeholder: 'Username',
          callback: ($event) => this.username = $event.target.value
        },
        {
          class: 'formInput',
          type: 'password',
          field: 'Password',
          testID: this.testID.passwordInput,
          placeholder: 'Password',
          callback: ($event) => this.password = $event.target.value,
          itemsUtils: [
            {
              icon: icons.showPassword,
              callback: () => {
                const input = this.formTemplate.inputs[1];
                inputUtils.toggleTypePassword(input);
              }
            },
          ],
        },
        {
          class: 'formInput formButton',
          type: 'button',
          value: 'Login',
          testID: this.testID.loginBtn,
          callback: () => this.login()
        }
      ],
      alternativeRoute: {
        alternativeText: 'click to sign up',
        testID: this.testID.signupBtn,
        callback: () => this.route.navigate([routesNames.signUp.value])
      },
    };
  }

  ngOnInit() {
  }

  login(): void {
    const validateForm = this.validateForm();
    if (validateForm.valid) {
      this.Auth.login(this.username, this.password, (data: Response) => {
        if (data.success) {
          this.route.navigate([routesNames.passwordTable.value]);
        } else {
          LoginComponent.logInError(data.message);
        }
      });
    } else {
      LoginComponent.logInError(validateForm.message);
    }
  }

  emptyInputExists() {
    return this.username === '' || this.password === '';
  }

  validateForm(): FormValidation {
    let valid = false;
    if (this.emptyInputExists()) {
      return {
        valid,
        message: 'Not all fields are filled'
      };
    }
    valid = true;
    return {
      valid,
      message: 'success'
    };
  }

  signUp(): void {
    this.route.navigate([routesNames.signUp.value]);
  }
}
