import { Component, Input, OnInit } from '@angular/core';
import { Icon } from '../../ViewUtils/Classes/Icon';

@Component({
    selector: 'app-icon',
    template: `
        <i class="material-icons" [innerHTML]="icon.value" [title]="icon.title || ''" [ngClass]="icon.options && icon.options.class" [ngStyle]="icon.options && this.icon.options.style"> </i>
    `,
    styleUrls: ['icon.component.scss']
})
export class IconComponent implements OnInit {
    @Input() icon: Icon;

    constructor() {}

    ngOnInit(): void {}
}
