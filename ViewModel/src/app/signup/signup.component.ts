import {Component, OnInit} from '@angular/core';
import {AuthService} from '../Services/auth.service';
import {Router} from '@angular/router';
import {routesNames} from '../ViewUtils/Objects/routeNames';
import {FormTemplate} from '../ViewUtils/Interfaces/Templates/FormTemplate';
import {FormValidation} from '../ViewUtils/Interfaces/FormValidation';
import {Response} from '../ViewUtils/Interfaces/Response';
import {inputUtils} from '../ViewUtils/Objects/DOM_Utils/DOM_Elements/Input';
import {icons} from '../ViewUtils/Objects/Icons';

@Component({
  selector: 'app-signup',
  template: `
      <app-form [template]="template"></app-form>
  `
})
export class SignupComponent implements OnInit {
  public email: string;
  public username: string;
  public password: string;
  public confirmPassword: string;
  public template: FormTemplate;

  constructor(private Auth: AuthService, private router: Router) {
    this.email = this.username = this.password = this.confirmPassword = '';
    this.template = this.getData();
  }

  static signUpError(message): void {
    alert(message);
  }

  getData(): FormTemplate {
    return {
      inputs: [
        {
          class: 'formInput',
          type: 'text',
          field: 'Email',
          placeholder: 'Email',
          callback: ($event) => this.email = $event.target.value,
        },
        {
          class: 'formInput',
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
          callback: ($event) => this.password = $event.target.value,
          itemsUtils: [
            {
              Icon: icons.showPassword,
              callback: (i): void => inputUtils.toggleInputType(this.template.inputs[i])
            },
          ],
        },
        {
          class: 'formInput',
          type: 'password',
          field: 'Confirm Password',
          placeholder: 'Confirm Password',
          callback: ($event) => this.confirmPassword = $event.target.value,
          itemsUtils: [{
            Icon: icons.showPassword,
            callback: (i): void => inputUtils.toggleInputType(this.template.inputs[i])
          }
          ],
        },
        {
          class: 'formInput formButton',
          type: 'button',
          value: 'Sign up',
          callback: () => this.signUp()
        }
      ],
      alternativeRoute: {
        alternativeText: 'click to login',
        callback: () => this.router.navigate([routesNames.login])
      },
    };
  }

  ngOnInit() {
  }

  signUp(): void {
    const validateForm = this.validateForm();
    if (validateForm.valid) {
      this.Auth.registerUserDetails(this.email, this.username, this.password, (data: Response) => {
        if (data.success) {
          this.Auth.login(this.username, this.password, (data: Response) => {
            if (data.success) {
              this.router.navigate([routesNames.passwordTable]);
            } else {
              SignupComponent.signUpError(data.message);
            }
          });
        } else {
          SignupComponent.signUpError(data.message);
        }
      });
    } else {
      SignupComponent.signUpError(validateForm.message);
    }
  }

  emptyInputExists() {
    return this.email === '' || this.username === '' || this.password === '' || this.confirmPassword === '';
  }

  validateForm(): FormValidation {
    let valid = false;
    if (this.emptyInputExists()) {
      return {
        valid,
        message: 'Not all fields are filled'
      };
    }
    if (this.emptyInputExists()) {
      return {
        valid,
        message: 'Not all fields are filled'
      };
    }
    if (!this.email.includes('@')) {
      return {
        valid,
        message: 'The Email address is not legal'
      };
    }
    if (this.password !== this.confirmPassword) {
      return {
        valid,
        message: 'Passwords do not match'
      };
    }
    valid = true;
    return {
      valid,
      message: 'success'
    };
  }
}
