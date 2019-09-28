import {Component, OnInit} from '@angular/core';
import {settings} from '../Settings/sidebar';
import {AuthService} from '../auth.service';
import {User} from '../ViewUtils/Interfaces/User';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  public curUserPermission: number;

  constructor(private Auth: AuthService) {
  }

  ngOnInit() {
    this.Auth.curActiveUserObservable.subscribe((user: User) => {
      this.curUserPermission = user ? user.permission : 3;
    });
  }

  filterSidebar() {
    // if the curActiveUser isn't logged in then filter any field with requiredLogin from the sidebar
    return settings.filter(field => !field.requireLogin || this.Auth.loggedIn);
  }
}
