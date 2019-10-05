import {Component, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';
import {icons} from '../ViewUtils/Objects/Icons';
import {Icon} from '../ViewUtils/Classes/Icon';
import {AllowIn, ShortcutInput} from 'ng-keyboard-shortcuts';

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
              <app-icon [icon]="searchIcon" (click)="toggleSearch()"></app-icon>
          </div>
          <div [hidden]="!searchVisible"><input class="searchInput" [value]="searchTerm"
                                                (input)="searchTermChange($event)" type="search"/>
          </div>
      </div>
  `,
})
export class SearchComponent implements OnInit {
  public searchVisible: boolean;
  public searchTerm: string;
  public onfocus: boolean;
  public searchBarShortcuts: Array<any>;
  public searchIcon: Icon = icons.search;
  @Output() searchTermChanged = new EventEmitter();

  constructor(private elRef: ElementRef) {
    this.searchVisible = false;
    this.searchTerm = '';
    this.onfocus = false;
  }

  ngOnInit(): void {
    this.searchBarShortcuts = this.initShortcuts();
  }

  initShortcuts(): ShortcutInput[] {
    return [{
      key: ['cmd + f'],
      label: 'Open the search bar',
      allowIn: [AllowIn.Input],
      command: () => {
        this.showSearch();
        this.selectSearchTerm();
      },
      preventDefault: true
    },
      {
        key: ['escape'],
        label: 'Close the search bar',
        allowIn: [AllowIn.Input],
        command: () => this.hideSearch(),
        preventDefault: true
      }];
  }

  searchTermChange($event: Event): void {
    this.searchTerm = ($event.target as HTMLInputElement).value;
    this.searchTermChanged.emit(this.searchTerm);
  }

  toggleSearch(): void {
    this.searchVisible = !this.searchVisible;
  }

  selectSearchTerm(): void {
    if (!this.searchVisible) {
      return;
    }
    const searchEl: HTMLInputElement = this.elRef.nativeElement.querySelector('.searchInput');
    searchEl.select();
  }

  showSearch(): void {
    if (this.searchVisible) {
      return;
    }
    this.searchVisible = true;
    this.searchTermChanged.emit(this.searchTerm);
    const searchEl: HTMLInputElement = this.elRef.nativeElement.querySelector('.searchInput');
    searchEl.focus();
  }

  hideSearch(): void {
    this.searchVisible = false;
    this.searchTermChanged.emit('');
  }

}
