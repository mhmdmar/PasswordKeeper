import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {User} from './ViewModel/ViewUtils/Interfaces/User';
import {Password} from './ViewModel/ViewUtils/Interfaces/Password';
import {Response} from './ViewModel/ViewUtils/Interfaces/Response';
import * as routes from './AppSettings/Routes';

const storageNamespace = {
  user: 'User',
  username: 'Username',
  password: 'Password',
  loggedIn: 'loggedIn'
};
const API = '/api';

function getRoutePath(route) {
  return API.concat('/', route);
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn: boolean;
  private _curActiveUser = new BehaviorSubject<any>(undefined);
  public curActiveUserObservable = this._curActiveUser.asObservable();

  constructor(private http: HttpClient) {
    const userInSession: boolean = localStorage.getItem(storageNamespace.loggedIn) !== null;
    this.loggedIn = userInSession;
    if (userInSession) {
      this.restoreUserInSession();
    }
  }

  get curActiveUser(): User {
    return this._curActiveUser.value;
  }

  set curActiveUser(user: User) {
    this._curActiveUser.next(user);
  }

  getAllUsers(callback: any): void {
    this.http.get(getRoutePath(routes.getUsers), {}).subscribe((data: Response) => {
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

  login(username: string, password: string, callback: any): void {
    this.http.post(getRoutePath(routes.getUser), {
      username, password
    }).subscribe((data: Response) => {
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
    this.curActiveUser = user;
  }

  restoreUserInSession(): void {
    const username: string = localStorage.getItem(storageNamespace.username);
    const password: string = localStorage.getItem(storageNamespace.password);
    this.login(username, password, (data: Response) => {
      this.curActiveUser = data.response;
    });
  }

  removeUserInSession(): void {
    localStorage.removeItem(storageNamespace.user);
    localStorage.removeItem(storageNamespace.username);
    localStorage.removeItem(storageNamespace.password);
    this.curActiveUser = undefined;
  }

  signOut(): void {
    this.setLoggedIn(false);
    this.removeUserInSession();
  }

  registerUserDetails(email: string, username: string, password: string, callback: any): void {
    this.http.post(getRoutePath(routes.insertUser), {
      email, username, password
    }).subscribe((data: Response) => {
      callback(data);
    });
  }

  removePassword(index: number, callback: any): void {
    const user: User = this.curActiveUser;
    this.http.post(getRoutePath(routes.removePasswordItem), {
      username: user.username,
      password: user.password,
      index
    }).subscribe((data: Response) => {
      if (data.success) {
        this.curActiveUser.passwordsList.splice(index, 1);
      }
      callback(data);
    });
  }

  addPassword(domain: string, username: string, password: string, callback: any): void {
    const newPassword: Password = {domain, username, password};
    const user: User = this.curActiveUser;
    this.http.post(getRoutePath(routes.addPasswordItem), {
      username: user.username,
      password: user.password,
      newPassword
    }).subscribe((data: Response) => {
      if (data.success) {
        this.curActiveUser.passwordsList.push(data.response);
      }
      callback(data);
    });
  }
}
