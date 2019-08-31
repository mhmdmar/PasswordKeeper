import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';

interface UserData {
  success: boolean;
  result: any;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private username: string;
  private password: string;
  private email: string;
  private confirmPassword: string;

  constructor(private Auth: AuthService, private route: Router) {
    this.username = this.password = this.email = this.confirmPassword = '';
  }

  ngOnInit() {
  }

  login() {
    this.Auth.getUserDetails(this.username, this.password).subscribe((data: UserData) => {
      if (data.success) {
        this.route.navigate(['']);
        this.Auth.setLoggedIn(true, data.result);
      }
    });
  }
}
