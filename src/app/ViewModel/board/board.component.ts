import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  private settings: any;

  constructor() {
    this.settings = {
      sidebarSettings: [
        {
          title: 'AAA',
          clickEvent() {
            window.alert('AAA');
          },
        },
        {
          title: 'BBB',
          clickEvent() {
            window.alert('BBB');
          },
        },
        {
          title: 'CCC',
          clickEvent() {
            window.alert('CCC');
          },
        },
      ]
    };
  }

  ngOnInit() {
  }
}

