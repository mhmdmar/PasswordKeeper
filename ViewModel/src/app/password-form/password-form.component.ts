import {Component, OnInit} from '@angular/core';
import {routesNames} from '../Settings/routeNames';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {FormTemplate} from '../ViewUtils/Interfaces/FormTemplate';
import {Response} from '../ViewUtils/Interfaces/Response';
import {inputUtils} from '../ViewUtils/DOM_Utils/DOM_Elements/Input';
import {iconsText} from '../Settings/iconsText';

@Component({
  selector: 'app-password-form',
  template: `
      <app-form [template]="formTemplate"></app-form>
  `
})
export class PasswordFormComponent implements OnInit {

  public domain: string;
  public username: string;
  public password: string;
  public formTemplate: FormTemplate;

  constructor(private Auth: AuthService, private route: Router) {
    this.domain = this.username = this.password = '';
    this.formTemplate = this.getTemplate();
  }

  static addPasswordError(message) {
    window.alert(message);
  }

  getTemplate(): FormTemplate {
    return {
      inputs: [
        {
          class: 'formInput',
          type: 'text',
          placeholder: 'Domain',
          field: 'Domain',
          callback: ($event) => this.domain = $event.target.value,

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
          placeholder: 'Password',
          field: 'Password',
          callback: ($event) => this.password = $event.target.value,
          helperBtn: {
            text: iconsText.showPassword,
            clickCallback: () => {
              const input = this.formTemplate.inputs[2];
              inputUtils.toggleTypePassword(input);
            }
          }
        },
        {
          class: 'formInput formButton',
          type: 'button',
          value: 'Add Password',
          callback: () => this.addPassword()
        }
      ],
      alternativeRoute: {
        alternativeText: 'click to see the passwords table',
        callback: () => this.route.navigate([routesNames.passwordTable])
      },
    };
  }

  addPassword(): void {
    if (this.validateForm()) {
      this.Auth.addPasswordItem(this.domain, this.username, this.password, (data: Response) => {
        if (data.success) {
          this.route.navigate([routesNames.passwordTable]);
        } else {
          PasswordFormComponent.addPasswordError(data.message);
        }
      });
    } else {
      PasswordFormComponent.addPasswordError('Some fields are not filled');
    }
  }

  validateForm() {
    return this.domain.length !== 0 && this.username.length !== 0 && this.password.length !== 0;
  }

  ngOnInit() {
  }

}
