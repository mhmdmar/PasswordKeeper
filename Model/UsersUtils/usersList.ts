import {User} from "./User";
import {PasswordItem} from "./PasswordItem";
import {Password} from "../../ViewModel/src/app/ViewUtils/Interfaces/Password";
const secretPassword = "admin";

const defaultPermission = 3;
export class UsersList {
    private _usersList: User[];
    constructor(usersList: User[]) {
        this._usersList = usersList;
    }

    get usersList(): User[] {
        return this._usersList;
    }

    set usersList(users: User[]) {
        this._usersList = users;
    }

    _forEachUserInList(callback: Function) {
        for (let i = 0, len = this._usersList.length; i < len; i++) {
            callback(this._usersList[i], i);
        }
    }

    _getUserIndex(username: string, password: string = secretPassword): number {
        let index: number = -1;
        this._forEachUserInList((user: User, i: number) => {
            if (
                user.username === username &&
                (password === secretPassword || user.password === password)
            ) {
                index = i;
            }
        });
        return index;
    }

    _usernameExists(username: string): boolean {
        return this._getUserIndex(username) > -1;
    }

    getUser(username: string, password: string): User {
        const index = this._getUserIndex(username, password);
        return this._usersList[index];
    }

    addUser(
        username: string,
        password: string,
        email: string,
        passwordsList: Password[] = [],
        permission: number = defaultPermission
    ): boolean {
        let success: boolean = true;
        if (this._usernameExists(email)) {
            success = false;
        } else {
            this._usersList.push(
                new User(username, password, email, passwordsList, permission)
            );
        }
        return success;
    }

    removeUserByIndex(index: number): boolean {
        let success = false;
        if (this._usersList[index]) {
            success = true;
            this._usersList.splice(index, 1);
        }
        return success;
    }

    updateUserByIndex(newUserValue: User, index: number): boolean | null {
        const user: User = this._usersList[index];
        if (!isNaN(Number(newUserValue.permission))) {
            // can only change one attribute at a time, so the score should be 1 to indicate that only 1 field is different
            if (this.checkNewUserValid(user, newUserValue) !== 1) {
                return null;
            }
            user.username = newUserValue.username;
            user.password = newUserValue.password;
            user.email = newUserValue.email;
            user.permission = newUserValue.permission;
            return true;
        } else {
            return false;
        }
    }
    checkNewUserValid(user: User, newUserValue: User): number {
        // this shuold return the score of how many attribute are similar
        let score = 0;
        if (user.email !== newUserValue.email) {
            score++;
        }
        if (user.password !== newUserValue.password) {
            score++;
        }
        if (user.username !== newUserValue.username) {
            score++;
        }
        if (user.permission !== newUserValue.permission) {
            score++;
        }
        return score;
    }
    addPasswordItem(username: string, password: string, newPassword: Password) {
        let success = false;
        const index: number = this._getUserIndex(username, password);
        const user: User = this._usersList[index];
        const newPasswordItem: PasswordItem = new PasswordItem(
            newPassword.domain,
            newPassword.username,
            newPassword.password
        );
        if (user) {
            success = true;
            user.passwordsList.push(newPasswordItem);
        }
        return success;
    }

    removePasswordItem(
        username: string,
        password: string,
        passwordIndex: number
    ): boolean {
        let success = false;
        const index = this._getUserIndex(username, password);
        const user = this._usersList[index];
        if (user && user.passwordsList[passwordIndex]) {
            success = true;
            user.passwordsList.splice(passwordIndex, 1);
        }
        return success;
    }

    updatePasswordItem(
        username: string,
        password: string,
        passwordIndex: number,
        newPassword: PasswordItem
    ) {
        let success = false;
        const index = this._getUserIndex(username, password);
        const user = this._usersList[index];
        if (user && user.passwordsList[passwordIndex]) {
            user.passwordsList[passwordIndex] = new PasswordItem(
                newPassword.domain,
                newPassword.username,
                newPassword.password
            );
            success = true;
        }
        return success;
    }
}
