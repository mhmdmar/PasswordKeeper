import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountBarComponent } from './account-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { routesNames } from '../ViewUtils/Objects/routeNames';
import { IconComponent } from '../Components/icon/icon.component';
import { DropdownComponent } from '../Components/dropdown/dropdown.component';

describe('AccountBarComponent', () => {
    let component: AccountBarComponent;
    let fixture: ComponentFixture<AccountBarComponent>;
    let navigateSpy;
    let testID;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AccountBarComponent, IconComponent, DropdownComponent],
            imports: [RouterTestingModule, HttpClientTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountBarComponent);
        component = fixture.componentInstance;
        navigateSpy = spyOn(TestBed.get(Router), 'navigate');
        testID = component.testID;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Navigate to login', () => {
        component.navigateToLogin();
        expect(navigateSpy).toHaveBeenCalledWith([routesNames.login]);
    });
});
