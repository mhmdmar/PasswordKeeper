import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
      <p class="homeText app-text-font">
          This App will make your life easier, only remember this app password and in return it will remember all off your
          passwords for you
      </p>
      <img class="center" alt="password" src="../../assets/Images/password_home.png">
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
