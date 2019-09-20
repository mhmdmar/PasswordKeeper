import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {routesNames} from '../Settings/routeNames';
import {routes} from '../Settings/routes';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['../CSS/GoogleFonts.scss', './board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(private Auth: AuthService, private router: Router) {
  }

  allowedRoutes(): boolean {
    let curRouterUrl = this.router.url;
    if (curRouterUrl === '/') { // empty path
      curRouterUrl = '';
    }
    const curRoute: any = routes.find((route) => route.path === curRouterUrl);
    return (curRoute && !curRoute.canActivate);
  }

  ngOnInit() {
    if (!this.Auth.loggedIn && !this.allowedRoutes()) {
      this.router.navigate([routesNames.login]);
    }
  }
}
