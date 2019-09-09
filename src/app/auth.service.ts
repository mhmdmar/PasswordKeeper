import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {User} from './ViewModel/ViewUtils/Interfaces/User';
import {Password} from './ViewModel/ViewUtils/Interfaces/Password';
import {Response} from './ViewModel/ViewUtils/Interfaces/Response';

const storageNamespace = {
  user: 'User',
  username: 'Username',
  password: 'Password',
  loggedIn: 'loggedIn'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _curActiveUser = new BehaviorSubject<any>(undefined);
  public curActiveUserObservable = this._curActiveUser.asObservable();
  private loggedInStatues: boolean;

  constructor(private http: HttpClient) {
    const userInSession: boolean = localStorage.getItem(storageNamespace.loggedIn) !== null;
    this.loggedInStatues = userInSession;
    if (userInSession) {
      this.restoreUserInSession();
    }
  }

  get curActiveUser(): User {
    return this._curActiveUser.value;
  }

  set curActiveUser(user) {
    this._curActiveUser.next(user);
  }

  restoreUserInSession(): void {
    const username: string = localStorage.getItem(storageNamespace.username);
    const password: string = localStorage.getItem(storageNamespace.password);
    this.login(username, password, (data: Response) => {
      this.curActiveUser = data.response;
    });
  }

  setLoggedIn(value: boolean): void {
    if (value) {
      localStorage.setItem(storageNamespace.loggedIn, 'true');
    } else {
      localStorage.removeItem(storageNamespace.loggedIn);
    }
    this.loggedInStatues = value;
  }

  get loggedIn(): boolean {
    return this.loggedInStatues;
  }

  signOut(): void {
    this.setLoggedIn(false);
    localStorage.removeItem(storageNamespace.user);
    localStorage.removeItem(storageNamespace.username);
    localStorage.removeItem(storageNamespace.password);
    this.curActiveUser = undefined;
  }

  loginSuccessfully(user: User): void {
    this.setLoggedIn(true);
    localStorage.setItem(storageNamespace.username, user.username);
    localStorage.setItem(storageNamespace.password, user.password);
    this.curActiveUser = user;
  }

  login(username: string, password: string, callback?: any): any {
    return this.http.post('/api/getUser', {
      username, password
    }).subscribe((data) => {
      callback(data);
    });
  }

  registerUserDetails(email: string, username: string, password: string): any {
    return this.http.post('/api/insertUser', {
      email, username, password
    });
  }

  updateUserDetails(domain: string, username: string, password: string): any {
    const newPassword: Password = {domain, username, password};
    const user: User = this.curActiveUser;
    user.passwordsList.push(newPassword);
    return this.http.post('/api/addPassword', {
      username: user.username,
      password: user.password,
      newPassword
    });
  }
}
