import {Component, OnInit} from '@angular/core';
import {topBar} from '../ViewUtils/Objects/topbar';
import {icons} from '../ViewUtils/Objects/Icons';
import {Icon} from '../ViewUtils/Classes/Icon';
import {EventsService} from '../Services/events.service';
import {ComponentsEvents} from '../ViewUtils/Interfaces/ComponentsEvents';
import {topBarTemplate} from '../ViewUtils/Interfaces/Templates/topBarTemplate';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  public template: topBarTemplate;
  public title: string;
  public toggleSidebarIcon: Icon;

  constructor(private eventService: EventsService) {
    this.template = topBar;
    this.title = this.template.title;
    this.toggleSidebarIcon = icons.toggleSidebar;
  }

  ngOnInit(): void {
  }

  toggleSidebar(): void {
    const message: ComponentsEvents = {
      component: 'sidebar',
      eventFunction: 'toggleSidebar',
    };
    this.eventService.newEvent(message);
  }

}
