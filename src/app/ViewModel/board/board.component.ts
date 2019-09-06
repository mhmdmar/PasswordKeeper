import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {routesNames} from '../../routeNames';
import {routes} from '../../app.module';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  private settings: any;

  constructor(private Auth: AuthService, private router: Router) {
  }

  allowedRoutes(): boolean {
    let curRouterUrl = this.router.url;
    if (curRouterUrl === '/') { // empty path
      curRouterUrl = '';
    }
    let allowedRoute = false;
    routes.forEach(route => {
        if (curRouterUrl === route.path && !route.canActivate) {
          allowedRoute = true;
        }
      }
    );
    return allowedRoute;
  }

  ngOnInit() {
    if (!this.Auth.loggedIn && !this.allowedRoutes()) {
      this.router.navigate([routesNames.login]);
    }
  }
}

