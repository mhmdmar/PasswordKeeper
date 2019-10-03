import {Component, OnInit} from '@angular/core';
import {sidebarItems} from '../ViewUtils/Objects/sidebar';
import {AuthService} from '../Services/auth.service';
import {User} from '../ViewUtils/Interfaces/User';
import {Icon} from '../ViewUtils/Classes/Icon';
import {icons} from '../ViewUtils/Objects/Icons';
import {EventsService} from '../Services/events.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  public curUserPermission: number;
  public sidebarVisible: boolean;
  public toggleSidebarIcon: Icon;

  constructor(private Auth: AuthService, private eventService: EventsService) {
    this.sidebarVisible = true;
    this.toggleSidebarIcon = icons.toggleSidebar;
  }

  ngOnInit() {
    this.Auth.curActiveUserObservable.subscribe((user: User) => {
      this.curUserPermission = user ? user.permission : 3;
    });
    this.eventService.currentEventObservable.subscribe((event) => {
      const curEvent = event.split('/');
      const componentName = curEvent[0];
      const functionName = curEvent[1];
      if (componentName === 'sidebar' && this[functionName]) {
        this[functionName]();
      }
    });
  }

  filterSidebar() {
    // if the curActiveUser isn't logged in then filter any field with requiredLogin from the sidebar
    return sidebarItems.filter(field => !field.requireLogin || this.Auth.loggedIn);
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  navigate(data: any): Array<any> | string {
    const route = data.route.split(':');
    let navigate = [route[0]];
    route.length > 1 && navigate.push('');
    return navigate;
  }
}
