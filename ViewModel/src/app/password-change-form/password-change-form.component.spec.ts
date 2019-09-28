import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PasswordChangeFormComponent} from './password-change-form.component';
import {FormComponent} from '../form/form.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('PasswordChangeFormComponent', () => {
  let component: PasswordChangeFormComponent;
  let fixture: ComponentFixture<PasswordChangeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordChangeFormComponent, FormComponent],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordChangeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
