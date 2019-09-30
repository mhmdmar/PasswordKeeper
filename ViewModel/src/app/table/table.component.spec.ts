import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TableComponent} from './table.component';
import {TableTemplate} from '../ViewUtils/Interfaces/Templates/TableTemplate';

const DummyFormTemplate: TableTemplate = {
  headers:
    [
      {text: 'Email'},
      {text: 'Username'}
    ],
  itemsList: [
    {email: 'aa', username: 'bb'},
    {email: 'aa', username: 'bb'},
    {email: 'aa', username: 'bb'},
  ],
  itemsUtils: [
    {
      value: 'delete',
      callback: (index) => this.removeUser(index)
    },
    {
      value: 'edit',
      callback: (index) => this.changeUser(index)
    }
  ],
  chosenIndex: null
};

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent]
    })
      .compileComponents();
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
