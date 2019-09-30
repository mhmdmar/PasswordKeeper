import {Component, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';
import {inputTypes} from '../ViewUtils/Objects/DOM_Utils/DOM_Elements/Input';

@Component({
  selector: 'app-search',
  styles: [`
      .searchContainer {
          display: inline-flex;
      }

      .searchInput {
          width: 100%;
          height: 100%;
      }
  `],
  template: `
      <ng-keyboard-shortcuts [shortcuts]="searchBarShortcuts"></ng-keyboard-shortcuts>
      <div class="searchContainer">
          <div>
              <i class="material-icons" (click)="toggleSearch()" [innerHTML]="'search'"></i>
          </div>
          <div [hidden]="!searchVisibile"><input class="searchInput" [value]="searchTerm"
                                                 (input)="searchTermChange($event)" type="search"/>
          </div>
      </div>
  `,
})
export class SearchComponent implements OnInit {
  private searchVisibile: boolean;
  private searchTerm: string;
  private onfocus: boolean;
  protected searchBarShortcuts: Array<any>;
  @Output() searchTermChanged = new EventEmitter();

  constructor(private elRef: ElementRef) {
    this.searchVisibile = false;
    this.searchTerm = '';
    this.onfocus = false;
  }

  ngOnInit() {
    this.searchBarShortcuts = this.initShortcuts();
  }

  initShortcuts(): Array<any> {
    return [{
      key: ['cmd + f'],
      label: 'Open the search bar',
      allowIn: [inputTypes.Input],
      command: () => {
        this.showSearch();
        this.selectSearchTerm();
      },
      preventDefault: true
    },
      {
        key: ['escape'],
        label: 'Close the search bar',
        allowIn: [inputTypes.Input],
        command: () => this.hideSearch(),
        preventDefault: true
      }];
  }

  searchTermChange($event) {
    this.searchTerm = $event.target.value;
    this.searchTermChanged.emit(this.searchTerm);
  }

  toggleSearch() {
    this.searchVisibile = !this.searchVisibile;
  }

  selectSearchTerm() {
    if (!this.searchVisibile) {
      return;
    }
    const searchEl: HTMLInputElement = this.elRef.nativeElement.querySelector('.searchInput');
    searchEl.select();
  }

  showSearch() {
    if (this.searchVisibile) {
      return;
    }
    this.searchVisibile = true;
    this.searchTermChanged.emit(this.searchTerm);
    const searchEl: HTMLInputElement = this.elRef.nativeElement.querySelector('.searchInput');
    searchEl.focus();
  }

  hideSearch() {
    this.searchVisibile = false;
    this.searchTermChanged.emit('');
  }

}
