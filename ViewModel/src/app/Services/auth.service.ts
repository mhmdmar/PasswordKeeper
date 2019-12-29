import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../ViewUtils/Interfaces/User';
import { Password } from '../ViewUtils/Interfaces/Password';
import { Response } from '../ViewUtils/Interfaces/Response';
import routes from '../../../../AppSettings/Routes.json';

const storageNamespace = {
    user: 'User',
    email: 'Email',
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

    login(email: string, password: string, callback: Function): void {
        this.http
            .post(getRoutePath(routes.getUser), {
                email,
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
        localStorage.setItem(storageNamespace.email, user.email);
        localStorage.setItem(storageNamespace.password, user.password);
        localStorage.setItem(storageNamespace.permission, user.permission.toString());
        this.curActiveUser = user;
    }

    restoreUserInSession(callback: Function): void {
        const userInSession: boolean = localStorage.getItem(storageNamespace.loggedIn) !== null;
        if (userInSession) {
            const email: string = localStorage.getItem(storageNamespace.email);
            const password: string = localStorage.getItem(storageNamespace.password);
            this.login(email, password, (data: Response) => {
                if (data.success) {
                    this.curActiveUser = data.response;
                }
                this.loggedIn = data.success;
                callback(data);
            });
        }
    }

    removeUserInSession(): void {
        localStorage.removeItem(storageNamespace.email);
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
        const passwordToDelete = this.curActiveUser.passwordsList[index];
        const user: User = this.curActiveUser;
        this.http
            .post(getRoutePath(routes.removePasswordItem), {
                username: user.username,
                password: user.password,
                id: passwordToDelete.id
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
                username: user.email,
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
        newPassword.id = this.curActiveUser.passwordsList[index].id;
        this.http
            .post(getRoutePath(routes.updatePasswordItem), {
                username: user.email,
                password: user.password,
                newPassword
            })
            .subscribe((data: Response) => {
                if (data.success) {
                    this.curActiveUser.passwordsList[index] = newPassword;
                }
                callback(data);
            });
    }
    removeUser(email: number, callback: Function): void {
        this.http
            .post(getRoutePath(routes.removeUser), {
                email
            })
            .subscribe((data: Response) => {
                callback(data);
            });
    }
    updateUser(email, newUser, callback: Function): void {
        this.http
            .post(getRoutePath(routes.updateUser), {
                email,
                newUser
            })
            .subscribe((data: Response) => {
                callback(data);
            });
    }
    isAdminUser(): boolean {
        return this.curActiveUser.permission === 1;
    }
}
