import {Component, Input, OnInit} from '@angular/core';
import {FormTemplate} from '../../ViewUtils/Interfaces/Templates/FormTemplate';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() template: FormTemplate;

  constructor() {
  }

  ngOnInit(): void {
  }
}
