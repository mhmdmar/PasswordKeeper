import {Component, OnInit} from '@angular/core';
import {routesNames} from '../Settings/routeNames';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnInit {

  public domain: string;
  public username: string;
  public password: string;
  public data: any;

  constructor(private Auth: AuthService, private route: Router) {
    this.domain = this.username = this.password;
    this.data = this.getData();
  }

  static addPasswordError() {
    window.alert('Error in adding the password');
  }

  getData() {
    return {
      inputs: [
        {
          type: 'text',
          placeholder: 'Domain',
          callback: ($event) => this.domain = $event.target.value
        },
        {
          type: 'text',
          placeholder: 'Username',
          callback: ($event) => this.username = $event.target.value
        },
        {
          type: 'password',
          placeholder: 'Password',
          callback: ($event) => this.password = $event.target.value
        },
        {
          type: 'button',
          value: 'Add Password',
          callback: () => this.addPassword()
        }
      ],
      alternative: {
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
