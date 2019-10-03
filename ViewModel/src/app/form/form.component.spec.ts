import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormComponent} from './form.component';
import {routesNames} from '../ViewUtils/Objects/routeNames';
import {FormTemplate} from '../ViewUtils/Interfaces/Templates/FormTemplate';
import {DOMHelper} from '../ViewUtils/Objects/DOM_Utils/DOM_Helper';

const DummyFormTemplate: FormTemplate = {
  inputs: [
    {
      class: 'text',
      type: 'text',
      field: 'textField',
      placeholder: 'textField',
      testID: 'textID',
      callback: (): void => {
      }
    },
    {
      class: 'btn',
      type: 'button',
      value: 'buttonField',
      testID: 'btnID',
      callback: (): void => {
      }
    }
  ],
  alternativeRoute: {
    alternativeText: 'click to sign up',
    callback: () => this.route.navigate([routesNames.signUp])
  },
};
describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    component.template = DummyFormTemplate;
    fixture.detectChanges();
  });

  it('Form component create', () => {
    expect(component).toBeTruthy();
  });
  it('Form text input class', () => {
    const textByClass = fixture.nativeElement.querySelector('.text');
    expect(textByClass).toBeTruthy();
  });

  it('Form text input testID', () => {
    const textByTestID = fixture.nativeElement.querySelector(DOMHelper.testIdSelector('textID'));
    expect(textByTestID).toBeTruthy();
  });
  it('Form text input placeholder', () => {
    const textPlaceHolder = fixture.nativeElement.querySelector('.text').placeholder;
    expect(textPlaceHolder).toEqual('textField');
  });

  it('Form text input type', () => {
    const textType = fixture.nativeElement.querySelector('.text').type;
    expect(textType).toEqual('text');
  });

  it('Form text input field', () => {
    const textFieldText = fixture.nativeElement.querySelector('form div span.app-text').innerHTML;
    expect(textFieldText).toEqual('textField');
  });

  it('Form button input class', () => {
    const btnByClass = fixture.nativeElement.querySelector('.btn');
    expect(btnByClass).toBeTruthy();
  });

  it('Form button input testID', () => {
    const btnByTestID = fixture.nativeElement.querySelector(DOMHelper.testIdSelector('btnID'));
    expect(btnByTestID).toBeTruthy();
  });

  it('Form button input type', () => {
    const btnType = fixture.nativeElement.querySelector('.btn').type;
    expect(btnType).toEqual('button');
  });

  it('Form button input value', () => {
    const btnValue = fixture.nativeElement.querySelector('.btn').value;
    expect(btnValue).toEqual('buttonField');
  });
});
