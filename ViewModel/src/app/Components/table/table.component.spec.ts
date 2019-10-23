import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { TableTemplate } from '../../ViewUtils/Interfaces/Templates/TableTemplate';
import { icons } from '../../ViewUtils/Objects/Icons';
import { SearchComponent } from '../../search/search.component';
import { IconComponent } from '../icon/icon.component';
import { KeyboardShortcutsComponent } from 'ng-keyboard-shortcuts';

const DummyFormTemplate: TableTemplate = {
    headers: [{ text: 'Email' }, { text: 'Username' }],
    itemsList: [{ email: 'aa', username: 'bb' }, { email: 'aa', username: 'bb' }, { email: 'aa', username: 'bb' }],
    itemsUtils: [
        {
            Icon: icons.delete,
            callback: index => this.removeUser(index)
        },
        {
            Icon: icons.edit,
            callback: index => this.changeUser(index)
        }
    ],
    chosenIndex: null,
    editableByAdmin: true
};

describe('TableComponent', () => {
    let component: TableComponent;
    let fixture: ComponentFixture<TableComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TableComponent, SearchComponent, IconComponent, KeyboardShortcutsComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TableComponent);
        component = fixture.componentInstance;
        component.template = DummyFormTemplate;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
