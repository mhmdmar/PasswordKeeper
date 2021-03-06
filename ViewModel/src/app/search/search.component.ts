import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { icons } from '../ViewUtils/Objects/Icons';
import { Icon } from '../ViewUtils/Classes/Icon';
import { AllowIn, ShortcutInput } from 'ng-keyboard-shortcuts';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DOMHelper } from '../ViewUtils/Objects/DOM_Utils/DOM_Helper';

@Component({
    selector: 'app-search',
    styleUrls: ['./search.component.scss'],
    template: `
        <ng-keyboard-shortcuts [shortcuts]="searchBarShortcuts"></ng-keyboard-shortcuts>
        <div class="searchWrapper">
            <app-icon [icon]="searchIcon" (click)="toggleSearch()"></app-icon>
            <input [hidden]="!searchVisible" class="searchInput" [value]="searchTerm" (input)="searchTermChange($event)" type="search" />
        </div>
    `
})
export class SearchComponent implements OnInit {
    public searchVisible: boolean;
    public searchTerm: string;
    public onfocus: boolean;
    public searchBarShortcuts: Array<any>;
    public searchIcon: Icon = icons.search;
    private searchTermObservable: Subject<string> = new Subject();
    private searchInputSelector = '.searchInput';
    @Output() searchTermChanged = new EventEmitter();

    constructor(private elRef: ElementRef) {
        this.searchTerm = '';
        this.searchVisible = false;
        this.onfocus = false;
    }

    ngOnInit(): void {
        this.searchBarShortcuts = this.initShortcuts();
        this.searchTermObservable.pipe(debounceTime(150)).subscribe(searchTerm => {
            this.searchTermChanged.emit(searchTerm);
        });
    }

    initShortcuts(): ShortcutInput[] {
        return [
            {
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
                key: ['cmd +  c'],
                label: 'Close the search bar',
                allowIn: [AllowIn.Input],
                command: () => this.hideSearch(),
                preventDefault: true
            }
        ];
    }

    searchTermChange($event: Event): void {
        const searchTerm = ($event.target as HTMLInputElement).value;
        this.searchTerm = searchTerm;
        this.searchTermObservable.next(searchTerm);
    }

    toggleSearch(): void {
        if (this.searchVisible) {
            this.hideSearch();
        } else {
            this.showSearch();
        }
    }

    selectSearchTerm(): void {
        if (!this.searchVisible) {
            return;
        }
        const searchEl: HTMLInputElement = this.elRef.nativeElement.querySelector(this.searchInputSelector);
        searchEl.select();
    }

    showSearch(): void {
        if (this.searchVisible) {
            return;
        }
        this.searchVisible = true;
        this.searchTermObservable.next(this.searchTerm);
        DOMHelper.focusElement(this.searchInputSelector);
    }

    hideSearch(): void {
        this.searchVisible = false;
        this.searchTermObservable.next('');
    }
}
