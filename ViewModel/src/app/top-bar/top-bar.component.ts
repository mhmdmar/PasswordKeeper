import {Component, OnInit} from '@angular/core';
import {settings} from '../ViewUtils/Objects/topbar';
import {icons} from '../ViewUtils/Objects/Icons';
import {Icon} from '../ViewUtils/Classes/Icon';
import {EventsService} from '../Services/events.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  public settings: any;
  public title: string;
  private toggleSidebarIcon: Icon;

  constructor(private eventService: EventsService) {
    this.settings = settings;
    this.title = this.settings.title;
    this.toggleSidebarIcon = icons.toggleSidebar;
  }

  ngOnInit() {
  }

  toggleSidebar() {
    this.eventService.newEvent('sidebar/toggleSidebar');
  }

}
