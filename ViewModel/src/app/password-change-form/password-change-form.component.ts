import {Component, OnInit} from '@angular/core';
import {FormTemplate} from '../ViewUtils/Interfaces/FormTemplate';
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {routesNames} from '../Settings/routeNames';
import {User} from '../ViewUtils/Interfaces/User';
import {inputUtils} from '../ViewUtils/DOM_Utils/DOM_Elements/Input';
import {iconsText} from '../Settings/iconsText';

@Component({
  selector: 'app-password-change-form',
  template: `
      <app-form [template]="formTemplate"></app-form>
  `
})
export class PasswordChangeFormComponent implements OnInit {

  private passwordIndex = 0;
  public domain: string;
  public username: string;
  public password: string;
  protected formTemplate: FormTemplate;

  constructor(private auth: AuthService, private route: Router, private activeRoute: ActivatedRoute) {
    this.domain = '';
    this.password = '';
    this.username = '';
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
          value: this.domain
        },
        {
          class: 'formInput',
          type: 'text',
          placeholder: 'Username',
          field: 'Username',
          callback: ($event) => this.username = $event.target.value,
          value: this.username
        },
        {
          class: 'formInput',
          type: 'text', // password type starts a text
          placeholder: 'Password',
          field: 'Password',
          callback: ($event) => this.password = $event.target.value,
          value: this.password,
          helperBtn: {
            text: iconsText.showPassword,
            clickCallback: () => {
              const input = this.formTemplate.inputs[2];
              inputUtils.toggleTypePassword(input);
            },
            title: 'show password'
          }
        },
        {
          class: 'formInput formButton',
          type: 'button',
          value: 'Change Password',
          callback: () => this.changePassword()
        }
      ],
      alternativeRoute: {
        alternativeText: 'click to see the passwords table',
        callback: () => this.route.navigate([routesNames.passwordTable])
      },
    };
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.passwordIndex = params.id;
      this.auth.curActiveUserObservable.subscribe((user: User) => {
        if (user && this.auth.curActiveUser.passwordsList.length > this.passwordIndex) {
          const user: User = this.auth.curActiveUser;
          const password = user.passwordsList[this.passwordIndex];
          this.domain = password.domain;
          this.password = password.password;
          this.username = password.username;
          this.formTemplate = this.getTemplate();
        }
      });

    });
  }

  changePassword() {
    this.auth.updatePasswordItem(this.domain, this.username, this.password, this.passwordIndex, (data) => {
      if (data.success) {
        this.route.navigate([routesNames.passwordTable]);
      }
    });

  }

}
