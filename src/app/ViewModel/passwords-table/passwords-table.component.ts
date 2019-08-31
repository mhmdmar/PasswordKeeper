import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-passwords-table',
  templateUrl: './passwords-table.component.html',
  styleUrls: ['./passwords-table.component.scss']
})
export class PasswordsTableComponent implements OnInit {

  private user: any;

  constructor(private Auth: AuthService) {
  }

  ngOnInit() {
    this.user = this.Auth.user;
  }

  changeText(event) {
  }

}
