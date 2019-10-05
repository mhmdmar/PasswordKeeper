import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteListenerService {
  private lastRouteStorageName: string = 'lastUrl';
  private lastRoute: string;

  constructor(private router: Router) {
    this.lastRoute = localStorage.getItem(this.lastRouteStorageName) || '/';
    this.listenToReload();
  }

  navigateToLastRoute(): void {
    this.router.navigateByUrl(this.lastRoute);
  }

  listenToReload(): void {
    window.onbeforeunload = () => {
      localStorage.setItem(this.lastRouteStorageName, this.router.url);
      return true;
    };
  }
}
