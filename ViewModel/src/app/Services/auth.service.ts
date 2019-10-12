import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../ViewUtils/Interfaces/User';
import { Password } from '../ViewUtils/Interfaces/Password';
import { Response } from '../ViewUtils/Interfaces/Response';
import routes from '../../../../AppSettings/Routes.json';

const storageNamespace = {
    user: 'User',
    username: 'Username',
    password: 'Password',
    permission: 'Permission',
    loggedIn: 'loggedIn'
};
const API = '/api';

function getRoutePath(route): string {
    return API.concat(route);
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public loggedIn: boolean;
    private _curActiveUser = new BehaviorSubject<User>(undefined);
    public curActiveUserObservable = this._curActiveUser.asObservable();

    constructor(private http: HttpClient) {}

    get curActiveUser(): User {
        return this._curActiveUser.value;
    }

    set curActiveUser(user: User) {
        this._curActiveUser.next(user);
    }

    getAllUsers(callback: Function, includePasswords: boolean): void {
        let permission = this.curActiveUser ? this.curActiveUser.permission : localStorage.getItem(storageNamespace.permission);
        const params = new HttpParams().set('permission', permission.toString()).set('includePasswords', includePasswords.toString());
        this.http.get(getRoutePath(routes.getUsers), { params }).subscribe((data: Response) => {
            callback(data);
        });
    }

    setLoggedIn(value: boolean): void {
        if (value) {
            localStorage.setItem(storageNamespace.loggedIn, 'true');
        } else {
            localStorage.removeItem(storageNamespace.loggedIn);
        }
        this.loggedIn = value;
    }

    login(username: string, password: string, callback: Function): void {
        this.http
            .post(getRoutePath(routes.getUser), {
                username,
                password
            })
            .subscribe((data: Response) => {
                if (data.success) {
                    this.assignUserToSession(data.response);
                }
                callback(data);
            });
    }

    assignUserToSession(user: User): void {
        this.setLoggedIn(true);
        localStorage.setItem(storageNamespace.username, user.username);
        localStorage.setItem(storageNamespace.password, user.password);
        localStorage.setItem(storageNamespace.permission, user.permission.toString());
        this.curActiveUser = user;
    }

    restoreUserInSession(callback: Function): void {
        const userInSession: boolean = localStorage.getItem(storageNamespace.loggedIn) !== null;
        if (userInSession) {
            const username: string = localStorage.getItem(storageNamespace.username);
            const password: string = localStorage.getItem(storageNamespace.password);
            this.login(username, password, (data: Response) => {
                if (data.success) {
                    this.curActiveUser = data.response;
                }
                this.loggedIn = data.success;
                callback(data);
            });
        }
    }

    removeUserInSession(): void {
        localStorage.removeItem(storageNamespace.username);
        localStorage.removeItem(storageNamespace.password);
        localStorage.removeItem(storageNamespace.permission);
        this.curActiveUser = undefined;
    }

    signOut(): void {
        this.setLoggedIn(false);
        this.removeUserInSession();
    }

    registerUserDetails(email: string, username: string, password: string, callback: Function): void {
        this.http
            .post(getRoutePath(routes.insertUser), {
                email,
                username,
                password
            })
            .subscribe((data: Response) => {
                callback(data);
            });
    }

    removePasswordItem(index: number, callback: Function): void {
        const user: User = this.curActiveUser;
        this.http
            .post(getRoutePath(routes.removePasswordItem), {
                username: user.username,
                password: user.password,
                index
            })
            .subscribe((data: Response) => {
                if (data.success) {
                    this.curActiveUser.passwordsList.splice(index, 1);
                }
                callback(data);
            });
    }

    addPasswordItem(domain: string, username: string, password: string, callback: Function): void {
        const newPassword: Password = { domain, username, password };
        const user: User = this.curActiveUser;
        this.http
            .post(getRoutePath(routes.addPasswordItem), {
                username: user.username,
                password: user.password,
                newPassword
            })
            .subscribe((data: Response) => {
                if (data.success) {
                    this.curActiveUser.passwordsList.push(data.response);
                }
                callback(data);
            });
    }

    updatePasswordItem(domain: string, username: string, password: string, index: number, callback: Function): void {
        const newPassword: Password = { domain, username, password };
        const user: User = this.curActiveUser;
        this.http
            .post(getRoutePath(routes.updatePasswordItem), {
                username: user.username,
                password: user.password,
                newPassword,
                index
            })
            .subscribe((data: Response) => {
                if (data.success) {
                    this.curActiveUser.passwordsList[index] = newPassword;
                }
                callback(data);
            });
    }
    removeUser(index: number, callback: Function): void {
        this.http
            .post(getRoutePath(routes.removeUser), {
                index
            })
            .subscribe((data: Response) => {
                callback(data);
            });
    }
    updateUser(email: string, username: string, password: string, permission = 3, index: number, callback: Function): void {
        const newUser: User = { email, username, password, permission };
        const user: User = this.curActiveUser;
        this.http
            .post(getRoutePath(routes.updateUser), {
                username: user.username,
                password: user.password,
                newUser,
                index
            })
            .subscribe((data: Response) => {
                callback(data);
            });
    }
}
