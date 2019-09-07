import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

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
  public curActiveUser: any;
  public userChange: Subject<any> = new Subject<any>();
  private loggedInStatues;

  constructor(private http: HttpClient) {
    const userInSession: boolean = localStorage.getItem(storageNamespace.loggedIn) !== null;
    this.loggedInStatues = userInSession;
    if (userInSession) {
      this.retrieveUserInSession();
    }
  }

  retrieveUserInSession() {
    const username: string = localStorage.getItem(storageNamespace.username);
    const password: string = localStorage.getItem(storageNamespace.password);
    this.curActiveUser = this.getUser(username, password).subscribe((data: any) => {
      this.curActiveUser = data.response;
    });
  }

  setLoggedIn(value: boolean) {
    if (value) {
      localStorage.setItem(storageNamespace.loggedIn, 'true');
    } else {
      localStorage.removeItem(storageNamespace.loggedIn);
      this.curActiveUser = undefined;
    }
    this.loggedInStatues = value;
  }

  get loggedIn() {
    return this.loggedInStatues;
  }

  login(username: string, password: string, callback: any): any {
    return this.http.post('/api/getUser', {
      username, password
    }).subscribe((data) => {
      callback(data);
    });
  }

  loginSuccessfully(user) {
    this.setLoggedIn(true);
    localStorage.setItem(storageNamespace.username, user.username);
    localStorage.setItem(storageNamespace.password, user.password);
    this.curActiveUser = user;
  }

  getUser(username: string, password: string) {
    return this.http.post('/api/getUser', {
      username, password
    });
  }

  registerUserDetails(email: string, username: string, password: string): any {
    return this.http.post('/api/insertUser', {
      email, username, password
    });
  }

  updateUserDetails(domain: string, username: string, password: string): any {
    const newPassword = {domain, username, password};
    this.curActiveUser.passwordsList.push(newPassword);
    return this.http.post('/api/addPassword', {
      username: this.curActiveUser.username,
      password: this.curActiveUser.password,
      newPassword
    });
  }
}
