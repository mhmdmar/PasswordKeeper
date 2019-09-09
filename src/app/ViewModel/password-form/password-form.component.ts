import {Component, OnInit} from '@angular/core';
import {routesNames} from '../Settings/routeNames';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {FormTemplate} from '../ViewUtils/Interfaces/FormTemplate';

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

  static addPasswordError() {
    window.alert('Error in adding the password');
  }

  getTemplate(): FormTemplate {
    return {
      inputs: [
        {
          class: '',
          type: 'text',
          placeholder: 'Domain',
          field: 'Domain',
          callback: ($event) => this.domain = $event.target.value
        },
        {
          class: '',
          type: 'text',
          placeholder: 'Username',
          field: 'Username',
          callback: ($event) => this.username = $event.target.value
        },
        {
          class: '',
          type: 'password',
          placeholder: 'Password',
          field: 'Password',
          callback: ($event) => this.password = $event.target.value
        },
        {
          class: '',
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
    this.Auth.updateUserDetails(this.domain, this.username, this.password).subscribe((data: any) => {
      if (data.success) {
        this.route.navigate([routesNames.passwordTable]);
      } else {
        PasswordFormComponent.addPasswordError();
      }
    });
  }

  ngOnInit() {
  }

}
