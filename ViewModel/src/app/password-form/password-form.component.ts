import {Component, OnInit} from '@angular/core';
import {routesNames} from '../ViewUtils/Objects/routeNames';
import {AuthService} from '../Services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormTemplate} from '../ViewUtils/Interfaces/Templates/FormTemplate';
import {Response} from '../ViewUtils/Interfaces/Response';
import {inputUtils} from '../ViewUtils/Objects/DOM_Utils/DOM_Elements/Input';
import {icons} from '../ViewUtils/Objects/Icons';
import {User} from '../ViewUtils/Interfaces/User';

@Component({
  selector: 'app-password-form',
  template: `
      <app-form [template]="formTemplate"></app-form>
  `
})
export class PasswordFormComponent implements OnInit {

  private passwordIndex: number = -1;
  public domain: string;
  public username: string;
  public password: string;
  public formTemplate: FormTemplate;
  private submitBtnText: string;
  // boolean indicator that an http request hasn't resolved, to prevent unnecessary requests by clicking multiple times in a row on the submit button
  private _httpRequestFlag: boolean;

  static addPasswordError(message) {
    window.alert(message);
  }

  constructor(private Auth: AuthService, private router: Router, private activeRoute: ActivatedRoute) {
    this._httpRequestFlag = false;
  }

  getTemplate(): FormTemplate {
    return {
      inputs: [
        {
          class: 'formInput',
          type: 'text',
          placeholder: 'Domain',
          field: 'Domain',
          callback: ($event): void => this.domain = $event.target.value,
          value: this.domain
        },
        {
          class: 'formInput',
          type: 'text',
          placeholder: 'Username',
          field: 'Username',
          callback: ($event): void => this.username = $event.target.value,
          value: this.username
        },
        {
          class: 'formInput',
          type: 'password',
          placeholder: 'Password',
          field: 'Password',
          callback: ($event): void => this.password = $event.target.value,
          value: this.password,
          itemsUtils: [{
            icon: icons.showPassword,
            callback: (): void => {
              const input = this.formTemplate.inputs[2];
              inputUtils.toggleTypePassword(input);
            }
          }
          ],
        },
        {
          class: 'formInput formButton',
          type: 'button',
          value: this.submitBtnText,
          callback: (): void => this.changePassword()
        }
      ],
      alternativeRoute: {
        alternativeText: 'click to see the passwords table',
        callback: (): Promise<boolean> => this.router.navigate([routesNames.passwordTable])
      },
    };
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      if (params.id === '') {
        this.domain = '';
        this.password = '';
        this.username = '';
        this.submitBtnText = 'Add Password';
        this.formTemplate = this.getTemplate();
      } else {
        this.passwordIndex = params.id;
        this.Auth.curActiveUserObservable.subscribe((user: User) => {
          if (user && this.Auth.curActiveUser.passwordsList.length > this.passwordIndex) {
            const user: User = this.Auth.curActiveUser;
            const password = user.passwordsList[this.passwordIndex];
            this.domain = password.domain;
            this.password = password.password;
            this.username = password.username;
            this.submitBtnText = 'Change Password';
            this.formTemplate = this.getTemplate();
          }
        });
      }
    });
  }

  changePassword(): void {
    !this._httpRequestFlag && this.passwordIndex === -1 ? this.addPassword() : this.updatePassword();
  }

  updatePassword(): void {
    this.Auth.updatePasswordItem(this.domain, this.username, this.password, this.passwordIndex, (data) => {
      if (data.success) {
        this.router.navigate([routesNames.passwordTable]);
      }
    });
  }

  addPassword(): void {
    if (this.validateForm()) {
      this._httpRequestFlag = true;
      this.Auth.addPasswordItem(this.domain, this.username, this.password, (data: Response) => {
        if (data.success) {
          this.router.navigate([routesNames.passwordTable]);
        } else {
          PasswordFormComponent.addPasswordError(data.message);
        }
        this._httpRequestFlag = false;
      });
    } else {
      PasswordFormComponent.addPasswordError('Some fields are not filled');
    }
  }

  validateForm(): boolean {
    return this.domain.length !== 0 && this.username.length !== 0 && this.password.length !== 0;
  }
}
