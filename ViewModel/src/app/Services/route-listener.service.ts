import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouteListenerService {
  private lastUrl = 'lastUrl';
  private lastRoute: string;

  constructor(private router: Router) {
    this.lastRoute = localStorage.getItem(this.lastUrl) || '/';
    this.listenToRoute();
    this.listenToReload();
  }

  navigateToLastRoute() {
    this.router.navigateByUrl(this.lastRoute);
  }

  listenToRoute() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(({urlAfterRedirects}: NavigationEnd) => {
        this.lastRoute = urlAfterRedirects;
      });
  }

  listenToReload() {
    window.onbeforeunload = () => {
      localStorage.setItem(this.lastUrl, this.lastRoute);
      return true;
    };
  }
}
