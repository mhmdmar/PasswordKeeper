import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  private username: string;
  private password: string;
  private email: string;
  private confirmPassword: string;

  constructor() {
    this.username = this.password = this.email = this.confirmPassword = '';
  }

  ngOnInit() {
  }

  register() {
  }
}
