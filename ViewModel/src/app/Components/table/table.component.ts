import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() template;

  private searchTerm: string;

  constructor() {
    this.searchTerm = '';
  }

  ngOnInit() {
  }

  getKeys(obj) {
    return Object.keys(obj);
  }

  filterList(): Array<object> {
    return this.template.itemsList.filter((item) => {
      return this.getKeys(item).some((attribute) => {
        return item[attribute].toString().includes(this.searchTerm);
      });
    });
  }

  updateSearchTerm(searchTerm): void {
    this.searchTerm = searchTerm;
  }
}
