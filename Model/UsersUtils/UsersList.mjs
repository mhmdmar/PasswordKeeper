import { User } from './User.mjs';
import { PasswordItem } from './Password.mjs';
const secretPassword = 'admin';

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
        if (this._usernameExists(email)) {
            success = false;
        } else {
            this._users.push(new User(username, password, email, passwordsList, permission));
        }
        return success;
    }

    removeUser(index) {
        let success = false;
        if (this._users[index]) {
            success = true;
            this._users.splice(index, 1);
        }
        return success;
    }

    updateUser(newUserValue, index) {
        const user = this._users[index];
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
    checkNewUserValid(user, newUserValue) {
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
