import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {routesNames} from '../../routesNames';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  private settings: any;

  constructor(private Auth: AuthService, private router: Router) {
  }

  onLoginOrSignUp(): boolean {
    return this.router.url === routesNames.login || this.router.url === routesNames.signUp;
  }

  ngOnInit() {
    if (!this.Auth.loggedIn && !this.onLoginOrSignUp()) {
      this.router.navigate([routesNames.login]);
    }
  }
}

