import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordsTableComponent } from './passwords-table.component';
import { TableComponent } from '../Components/table/table.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchComponent } from '../search/search.component';
import { IconComponent } from '../Components/icon/icon.component';
import { KeyboardShortcutsComponent } from 'ng-keyboard-shortcuts';
import { DropdownComponent } from '../Components/dropdown/dropdown.component';
describe('PasswordsTableComponent', () => {
    let component: PasswordsTableComponent;
    let fixture: ComponentFixture<PasswordsTableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PasswordsTableComponent, TableComponent, SearchComponent, IconComponent, KeyboardShortcutsComponent, DropdownComponent],
            imports: [RouterTestingModule, HttpClientTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PasswordsTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
