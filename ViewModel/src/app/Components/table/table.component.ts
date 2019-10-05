import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() template;

  constructor() {
  }

  getKeys(obj) {
    return Object.keys(obj);
  }

  filterList(searchTerm): void {
    const itemList = this.template.itemsList;
    this.template.filteredItemsList = itemList.filter((item) => {
      return this.getKeys(item).some((attribute) => {
        return item[attribute].toString().includes(searchTerm);
      });
    });
  }

  ngOnInit() {
  }
}
