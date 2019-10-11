import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { routesNames } from '../ViewUtils/Objects/routeNames';
import { User } from '../ViewUtils/Interfaces/User';
import { DropdownTemplate } from '../ViewUtils/Interfaces/Templates/DropdownTemplate';
import { icons } from '../ViewUtils/Objects/Icons';

@Component({
    selector: 'app-account-bar',
    templateUrl: './account-bar.component.html',
    styleUrls: ['./account-bar.component.scss']
})
export class AccountBarComponent implements OnInit {
    public user: User;
    public accountInfoVisible = false;
    public dropdownTemplate: DropdownTemplate;
    public loginText = 'Login';
    public testID = {
        login: 'login',
        user: 'user',
        userInfo: 'userInfo',
        logout: 'logout'
    };

    constructor(private Auth: AuthService, private router: Router) {
        this.dropdownTemplate = this.getDropdownTemplate();
    }

    ngOnInit(): void {
        this.Auth.curActiveUserObservable.subscribe((user: User) => {
            this.user = user;
            this.dropdownTemplate.title = (user && user.username) || '';
        });
    }
    getDropdownTemplate(): DropdownTemplate {
        return {
            title: '',
            options: [
                {
                    icon: icons.exit,
                    value: 'Logout',
                    callback: () => this.signOut()
                }
            ]
        };
    }
    signOut(): void {
        this.Auth.signOut();
        this.accountInfoVisible = false;
        this.navigateToLogin();
    }

    navigateToLogin(): void {
        this.router.navigate([routesNames.login]);
    }
}
