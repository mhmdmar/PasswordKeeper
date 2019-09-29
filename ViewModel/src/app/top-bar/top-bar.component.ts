import {Component, OnInit} from '@angular/core';
import {settings} from '../ViewUtils/Objects/topbar';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  private settings: any;
  private title: string;

  constructor() {
    this.settings = settings;
    this.title = this.settings.title;
  }

  ngOnInit() {
  }

}
