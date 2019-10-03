import {Component, Input, OnInit} from '@angular/core';
import {Icon} from '../../ViewUtils/Classes/Icon';

@Component({
  selector: 'app-icon',
  template: `
      <i class="material-icons" (click)="activateCallback()" [innerHTML]="icon.value" [title]="icon.title"
         [ngStyle]="iconStyle()">
      </i>
  `,
  styleUrls: ['icon.component.scss']
})

export class IconComponent implements OnInit {
  @Input() icon: Icon;

  constructor() {
  }

  ngOnInit() {
  }

  iconStyle() {
    return this.icon.options && this.icon.options.style;
  }

  activateCallback() {
    this.icon.options && this.icon.options.callback && this.icon.options.callback();
  }

}
