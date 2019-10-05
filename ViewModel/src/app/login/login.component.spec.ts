import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormComponent} from '../Components/form/form.component';
import {DOMHelper} from '../ViewUtils/Objects/DOM_Utils/DOM_Helper';
import {Router} from '@angular/router';
import {routesNames} from '../ViewUtils/Objects/routeNames';
import {IconComponent} from '../Components/icon/icon.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let alertSpy;
  let testID;
  let navigateSpy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, FormComponent, IconComponent],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    navigateSpy = spyOn(TestBed.get(Router), 'navigate');
    alertSpy = spyOn(window, 'alert');
    testID = component.testID;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('empty form login validate', () => {
    const validateForm = component.validateForm();
    expect(validateForm.valid).toBeFalsy();
  });

  it('navigate to sign up', () => {
    const signupBtn = fixture.nativeElement.querySelector(DOMHelper.testIdSelector(testID.signupBtn));
    signupBtn.click();
    fixture.detectChanges();
    expect(navigateSpy).toHaveBeenCalledWith([routesNames.signUp]);
  });
});
