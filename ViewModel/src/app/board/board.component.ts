import {Component, OnInit} from '@angular/core';
import {AuthService} from '../Services/auth.service';
import {RouteListenerService} from '../Services/route-listener.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['../CSS/GoogleFonts.scss', './board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(private Auth: AuthService, private routeListener: RouteListenerService) {
  }

  ngOnInit() {
    this.Auth.restoreUserInSession(() => {
      this.routeListener.navigateToLastRoute();
    });
  }
}
