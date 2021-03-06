import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordFormComponent } from './password-form.component';
import { FormComponent } from '../Components/form/form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IconComponent } from '../Components/icon/icon.component';
import { DropdownComponent } from '../Components/dropdown/dropdown.component';

describe('PasswordFormComponent', () => {
    let component: PasswordFormComponent;
    let fixture: ComponentFixture<PasswordFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PasswordFormComponent, FormComponent, IconComponent, DropdownComponent],
            imports: [RouterTestingModule, HttpClientTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PasswordFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
