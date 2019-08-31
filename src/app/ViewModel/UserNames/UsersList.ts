import {Users} from './Users';

export class UsersList {
  private list: Users[];

  constructor(usersList) {
    this.list = [];
    for (let i = 0, len = usersList.length; i < len; i++) {
      const curUser = usersList[i];
      this.list.push(new Users(curUser.name, curUser.password, curUser.domain));
    }
  }

  public getUsers(): Users[] {
    return this.list;
  }

  public getUsersByValue(): Users[] {
    return JSON.parse(JSON.stringify(this.list));
  }

  public addUser(name: string, password: string, domain: string = ''): void {
    if (this.checkDuplication(name, password)) {
      console.error('Users.json and password already exists in the list');
      return;
    }
    this.list.push(new Users(name, password, domain));
  }

  private checkDuplication(name: string, password: string): boolean {
    return this.getUser(name, password) !== null;
  }

  public changeUserPassword(name: string, oldPass: string, newPass: string): void {
    const passwordIndex = this.getUserIndexByNameAndPassword(name, oldPass);
    if (passwordIndex !== -1) {
      this.list[passwordIndex].setPassword(newPass);
    }
  }

  public changeUserName(name: string, password: string, newName: string): void {
    const passwordIndex = this.getUserIndexByNameAndPassword(name, password);
    if (passwordIndex !== -1) {
      this.list[passwordIndex].setName(newName);
    }
  }

  public changeUserDomain(name: string, password: string, newDomain: string): void {
    const passwordIndex = this.getUserIndexByNameAndPassword(name, password);
    if (passwordIndex !== -1) {
      this.list[passwordIndex].setName(newDomain);
    }
  }

  public removeUserByNameAndPassword(name: string, password: string): void {
    const index = this.getUserIndexByNameAndPassword(name, password);
    this.removeUser(index);
  }

  public removeUserById(id: number): void {
    const index = this.getUserIndexById(id);
    this.removeUser(index);
  }

  private removeUser(index: number): void {
    if (index !== -1) {
      this.list.splice(index, 1);
    }
  }

  public getUserIndexByNameAndPassword(name: string, password: string): number {
    for (let i = 0; i < this.list.length; i++) {
      const currPass: Users = this.list[i];
      if (currPass.getName() === name && currPass.getPassword() === password) {
        return i;
      }
    }
    return -1;
  }

  public getUserIndexById(id: number): number {
    for (let i = 0; i < this.list.length; i++) {
      const currPass: Users = this.list[i];
      if (currPass.getId() === id) {
        return i;
      }
    }
    return -1;
  }

  public getUser(name: string, password: string): Users | null {
    const usernameIndex = this.getUserIndexByNameAndPassword(name, password);
    if (usernameIndex !== -1) {
      return this.list[usernameIndex];
    }
    return null;
  }
}
