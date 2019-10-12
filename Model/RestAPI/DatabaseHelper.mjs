import { writeFile, readFileSync } from 'fs';
import { UsersList } from '../UsersUtils/UsersList';
import messages from '../Utils/Messages';
import { Response } from '../Utils/Response';

class DatabaseHelper {
    constructor(DB, databasePath, encoding) {
        this._DB = DB;
        this._databasePath = databasePath;
        this._encoding = encoding;
        this._usersList = new UsersList(this._DB.Users);
    }

    get DB() {
        return this._DB;
    }

    saveDB() {
        const stringifiedDB = JSON.stringify(this._DB);
        writeFile(this._databasePath, stringifiedDB, this._encoding, function(err) {
            if (err) {
                throw err;
            }
        });
    }

    getUsers(permission, includePasswords) {
        if (!permission || permission.toString() !== '1') {
            return new Response(false, messages.warning.unauthorized, null);
        }
        const users = includePasswords
            ? this._usersList.users
            : this._usersList.users.map(item => {
                  return {
                      username: item.username,
                      password: item.password,
                      email: item.email,
                      permission: item.permission
                  };
              });
        return new Response(true, messages.success.users, users);
    }

    getPasswords(username, password, startRange = -1, endRange = -1) {
        const user = this._usersList.getUser(username, password);
        if (!user) {
            return new Response(false, messages.warning.userDoesntExist, []);
        }
        const passwordsList = user.passwordsList;
        const len = passwordsList.length;
        startRange = startRange === -1 ? 0 : startRange;
        // increment by 1 to include the item with the endRange index
        endRange = (endRange === -1 ? len : endRange) + 1;
        return new Response(false, messages.success.success, passwordsList.slice(startRange, endRange));
    }

    getUser(username, password) {
        const user = this._usersList.getUser(username, password);
        const success = user !== undefined;
        return new Response(success, success ? messages.success.userExists : messages.warning.userDoesntExist, success ? user : null);
    }

    insertUser(username, password, email, passwordsList = []) {
        const result = this._usersList.addUser(username, password, email, passwordsList);
        return new Response(result, result ? messages.success.entry : messages.warning.emailTaken, username);
    }

    updateUserName(username, password, newValue) {
        return this._updateUserByAttribute(username, password, 'username', newValue);
    }

    updateUserPassword(username, password, newValue) {
        return this._updateUserByAttribute(username, password, 'password', newValue);
    }

    updateUserEmail(username, password, newValue) {
        return this._updateUserByAttribute(username, password, 'email', newValue);
    }

    updateUser(username, password, newUser, index) {
        const checkUser = this._checkUserArguments(username, password);
        if (checkUser !== true) {
            return checkUser;
        }
        let message;
        let success = this._usersList.updateUser(newUser, index);
        if (success) {
            message = messages.success.userUpdated;
        } else if (success === null) {
            success = false;
            message = messages.warning.oneAttributeLimit;
        } else {
            message = messages.warning.permissionType;
        }
        return new Response(success, message, newUser);
    }
    _checkUserArguments(username, password, newUser) {
        const user = this._usersList.getUser(username, password);
        if (!user || !newUser) {
            return new Response(false, messages.errors.invalidArguments, newUser);
        }
        if (user.permission !== 1) {
            return new Response(false, messages.warning.unauthorized, username);
        }
        return true;
    }
    removeUser(index) {
        const result = this._usersList.removeUser(index);
        return new Response(result, result ? messages.success.update : messages.warning.wrongIndex, index);
    }

    _updateUserByAttribute(username, password, attribute, value) {
        const result = this._usersList.updateUser(username, password, attribute, value);
        return new Response(result, result ? messages.success.removed : messages.warning.userDoesntExist, username);
    }

    addPasswordItem(username, password, newPassword) {
        if (!username || !password || !newPassword) {
            return new Response(false, messages.errors.invalidArguments);
        }
        const result = this._usersList.addPasswordItem(username, password, newPassword);
        return new Response(result, result ? messages.success.update : messages.warning.userDoesntExist, newPassword);
    }

    removePasswordItem(username, password, index) {
        if (!username || !password || index === undefined) {
            return new Response(false, messages.errors.invalidArguments);
        }
        const result = this._usersList.removePasswordItem(username, password, index);
        return new Response(result, result ? messages.success.update : messages.warning.userDoesntExist, index);
    }

    updatePasswordItem(username, password, index, newPassword) {
        if (!username || !password || index === undefined || newPassword === undefined) {
            return new Response(false, messages.errors.invalidArguments);
        }
        const result = this._usersList.updatePasswordItem(username, password, index, newPassword);
        return new Response(result, result ? messages.success.update : messages.warning.userDoesntExist, index);
    }
}

const databasePath = '../Database/UsersDB.json';
const encoding = 'utf8';
const DB = JSON.parse(readFileSync(databasePath, encoding));

export const databaseHelper = new DatabaseHelper(DB, databasePath, encoding);
