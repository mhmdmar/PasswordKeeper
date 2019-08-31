import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

const storageNamespace = {
  user: 'User',
  loggedIn: 'loggedIn'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: any;
  public userChange: Subject<any> = new Subject<any>();
  private loggedInStatues;

  constructor(private http: HttpClient) {
    const userInSession: any = localStorage.getItem(storageNamespace.user);
    const sessionExists: boolean = userInSession !== null;
    this.setLoggedIn(sessionExists, JSON.parse(userInSession));
  }

  userChanged(value) {
    const userInfo = localStorage.getItem(storageNamespace.user);
    this.user = value && userInfo !== null ? JSON.parse(userInfo) : undefined;
    this.userChange.next(this.user);
  }

  setLoggedIn(value: boolean, user?: any) {
    this.assignToLocalStorage(value, user);

    this.userChanged(value);
    this.loggedInStatues = value;
  }

  assignToLocalStorage(value, user = {}) {
    if (value) {
      localStorage.setItem(storageNamespace.loggedIn, 'true');
      localStorage.setItem(storageNamespace.user, JSON.stringify(user));
      this.user = user;
    } else {
      localStorage.removeItem(storageNamespace.loggedIn);
      localStorage.removeItem(storageNamespace.user);
    }
  }

  get loggedIn() {
    return this.loggedInStatues;
  }

  getUserDetails(username: string, password: string) {
    return this.http.post('/api/getUser', {
      username, password
    });
  }
}
