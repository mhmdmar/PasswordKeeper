import {Component, OnInit} from '@angular/core';
import {settings} from '../Settings/sidebar';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  private settings: any;

  constructor() {
    this.settings = settings;
  }

  ngOnInit() {
  }
}
