import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountBarComponent } from './account-bar.component';
import { User } from '../ViewUtils/Interfaces/User';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { routesNames } from '../ViewUtils/Objects/routeNames';
import { DOMHelper } from '../ViewUtils/Objects/DOM_Utils/DOM_Helper';
import { IconComponent } from '../Components/icon/icon.component';

const DummyUser: User = {
    username: 'admin',
    password: 'admin',
    email: 'admin',
    passwordsList: [],
    permission: 1
};

describe('AccountBarComponent', () => {
    let component: AccountBarComponent;
    let fixture: ComponentFixture<AccountBarComponent>;
    let navigateSpy;
    let testID;

    const logout = () => {
        showAccountInfo();
        const logoutElement: HTMLElement = fixture.nativeElement.querySelector(DOMHelper.testIdSelector(testID.logout));
        logoutElement.click();
        fixture.detectChanges();
    };
    const assignDummyUser = () => {
        component.user = DummyUser;
        fixture.detectChanges();
    };
    const showAccountInfo = () => {
        assignDummyUser();
        component.accountInfoVisible = true;
        fixture.detectChanges();
    };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AccountBarComponent, IconComponent],
            imports: [RouterTestingModule, HttpClientTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountBarComponent);
        component = fixture.componentInstance;
        navigateSpy = spyOn(TestBed.get(Router), 'navigate');
        testID = component.testID;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Login Element exists', () => {
        const loginElement: HTMLElement = fixture.nativeElement.querySelector(DOMHelper.testIdSelector(testID.login));
        expect(loginElement).toBeTruthy();
    });

    it('Login text is "login" when no user in session exists', () => {
        const loginElement: HTMLElement = fixture.nativeElement.querySelector(DOMHelper.testIdSelector(testID.login));
        expect(loginElement.innerText).toEqual('Login');
    });

    it('Navigate to login', () => {
        component.navigateToLogin();
        expect(navigateSpy).toHaveBeenCalledWith([routesNames.login]);
    });

    it('Navigate to login by "login" button', () => {
        const loginElement: HTMLElement = fixture.nativeElement.querySelector(DOMHelper.testIdSelector(testID.login));
        loginElement.click();
        expect(navigateSpy).toHaveBeenCalledWith([routesNames.login]);
    });

    it('Login inner text is the username in session', () => {
        assignDummyUser();
        const userElement: HTMLElement = fixture.nativeElement.querySelector(DOMHelper.testIdSelector(testID.user));
        expect(userElement.innerText).toEqual(DummyUser.username);
    });

    it('Logout option exists', () => {
        showAccountInfo();
        const logoutElement: HTMLElement = fixture.nativeElement.querySelector(DOMHelper.testIdSelector(testID.logout));
        expect(logoutElement).toBeTruthy();
    });
    it('Clicking on logout removes user from session', () => {
        logout();
        expect(component.user).toBeFalsy();
    });

    it('Clicking on logout makes "accountInfo" invisible', () => {
        logout();
        expect(component.accountInfoVisible).toBeFalsy();
    });

    it('Clicking on logout navigate to login', () => {
        logout();
        expect(navigateSpy).toHaveBeenCalledWith([routesNames.login]);
    });
});
