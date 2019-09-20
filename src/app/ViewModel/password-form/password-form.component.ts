import {Component, OnInit} from '@angular/core';
import {routesNames} from '../Settings/routeNames';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {FormTemplate} from '../ViewUtils/Interfaces/FormTemplate';
import {Response} from '../ViewUtils/Interfaces/Response';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnInit {

  public domain: string;
  public username: string;
  public password: string;
  protected template: FormTemplate;

  constructor(private Auth: AuthService, private route: Router) {
    this.domain = this.username = this.password;
    this.template = this.getTemplate();
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
          callback: ($event) => this.domain = $event.target.value
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
          callback: ($event) => this.password = $event.target.value
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
    this.Auth.addPassword(this.domain, this.username, this.password, (data: Response) => {
      if (data.success) {
        this.route.navigate([routesNames.passwordTable]);
      } else {
        PasswordFormComponent.addPasswordError(data.message);
      }
    });
  }

  ngOnInit() {
  }

}
