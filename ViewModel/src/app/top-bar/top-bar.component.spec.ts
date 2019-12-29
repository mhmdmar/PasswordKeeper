import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarComponent } from './top-bar.component';
import { IconComponent } from '../Components/icon/icon.component';
import { AccountBarComponent } from '../accountBar/account-bar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DOMHelper } from '../ViewUtils/Objects/DOM_Utils/DOM_Helper';
import { DropdownComponent } from '../Components/dropdown/dropdown.component';

describe('TopBarComponent', () => {
    let component: TopBarComponent;
    let fixture: ComponentFixture<TopBarComponent>;
    let testID;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TopBarComponent, IconComponent, AccountBarComponent, DropdownComponent],
            imports: [RouterTestingModule, HttpClientTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TopBarComponent);
        component = fixture.componentInstance;
        testID = component.testID;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('password keeper title bar exists', () => {
        const titleBar: HTMLElement = fixture.nativeElement.querySelector(DOMHelper.testIdSelector(testID.topBar));
        expect(titleBar).toBeTruthy();
    });

    it('password keeper title bar text is "Password Keeper"', () => {
        const titleBar: HTMLElement = fixture.nativeElement.querySelector(DOMHelper.testIdSelector(testID.topBar));
        expect(titleBar.innerHTML).toEqual('Password Keeper');
    });
});
