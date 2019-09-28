import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() template;
  private chosenIndex: number = null;

  constructor() {
  }

  getKeys(obj) {
    return Object.keys(obj);
  }

  ngOnInit() {
    this.bindEvent();
  }

  choseItem(callback, i) {
    this.chosenIndex = i;
    callback(i);
  }

  bindEvent() {
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        const len: number = this.template.itemsList.length;
        this.chosenIndex = this.chosenIndex < len - 1 ? this.chosenIndex + 1 : len - 1;
        event.preventDefault();
      }
      if (event.key === 'ArrowUp') {
        this.chosenIndex = this.chosenIndex > 0 ? this.chosenIndex - 1 : 0;
        event.preventDefault();
      }
    });
  }

  filterList(list, itemsToHide) {
    if (!itemsToHide) {
      return list;
    }
    return list.map((item) => {
      const newItem = {};
      for (const key of Object.keys(item)) {
        newItem[key] = itemsToHide.includes(key) ? '' : item[key];
      }
      return newItem;
    });
  }
}
