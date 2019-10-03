import {User} from "./User";
import {PasswordItem} from "./Password";

const secretPassword = "admin";

export class UsersList {
    constructor(list) {
        this._users = list;
    }

    get users() {
        return this._users;
    }

    set users(users) {
        this._users = users;
    }

    _forEachUserInList(callback) {
        for (let i = 0, len = this._users.length; i < len; i++) {
            callback(this._users[i], i);
        }
    }

    _getUserIndex(username, password = secretPassword) {
        let index = -1;
        this._forEachUserInList((user, i) => {
            if (user.username === username && (password === secretPassword || user.password === password)) {
                index = i;
            }
        });
        return index;
    }

    _usernameExists(username) {
        return this._getUserIndex(username) > -1;
    }

    getUser(username, password) {
        const index = this._getUserIndex(username, password);
        return this._users[index];
    }

    addUser(username, password, email, passwordsList = [], permission = 3) {
        let success = true;
        if (this._usernameExists(username)) {
            success = false;
        } else {
            this._users.push(new User(username, password, email, passwordsList, permission));
        }
        return success;
    }

    removeUser(username, password) {
        const index = this._getUserIndex(username, password);
        let success = false;
        if (index !== -1) {
            success = true;
            this._users.splice(index, 1);
        }
        return success;
    }

    updateUser(username, password, attribute, value) {
        let success = false;
        const index = this._getUserIndex(username, password);
        const user = this._users[index];
        if (user && user[attribute]) {
            success = true;
            user[attribute] = value;
        }
        return success;
    }

    addPasswordItem(username, password, newPassword) {
        let success = false;
        const index = this._getUserIndex(username, password);
        const user = this._users[index];
        const newPasswordItem = new PasswordItem(newPassword.domain, newPassword.username, newPassword.password, Date.now());
        if (user) {
            success = true;
            user.passwordsList.push(newPasswordItem);
        }
        return success;
    }

    removePasswordItem(username, password, passwordIndex) {
        let success = false;
        const index = this._getUserIndex(username, password);
        const user = this._users[index];
        if (user && user.passwordsList[passwordIndex]) {
            success = true;
            user.passwordsList.splice(passwordIndex, 1);
        }
        return success;
    }

    updatePasswordItem(username, password, passwordIndex, newPassword) {
        let success = false;
        const index = this._getUserIndex(username, password);
        const user = this._users[index];
        if (user && user.passwordsList[passwordIndex]) {
            user.passwordsList[passwordIndex] = new PasswordItem(newPassword.domain, newPassword.username, newPassword.password, Date.now());
            success = true;
        }
        return success;
    }

}