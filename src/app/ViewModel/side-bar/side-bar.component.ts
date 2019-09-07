import {Component, OnInit} from '@angular/core';
import {settings} from '../Settings/sidebar';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor(private Auth: AuthService) {
  }

  ngOnInit() {
  }

  filterSidebar() {
    // if the curActiveUser isn't logged in then filter any field with requiredLogin from the sidebar
    return settings.filter(field => !field.requireLogin ||  this.Auth.loggedIn);
  }
}
