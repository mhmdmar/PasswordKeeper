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

  getUser(username, password) {
    const user = this._usersList.getUser(username, password);
    const success = user !== undefined;
    return new Response(
      success,
      success ? messages.success.userExists : messages.warning.userDoesntExist,
      success ? user : null
    );
  }

  insertUser(username, password, email, passwordsList = []) {
    const result = this._usersList.addUser(
      username,
      password,
      email,
      passwordsList
    );
    return new Response(
      result,
      result ? messages.success.entry : messages.warning.emailTaken,
      username
    );
  }

  removeUser(username, password) {
    const result = this._usersList.removeUser(username, password);
    return new Response(
      result,
      result ? messages.success.deletion : messages.warning.userDoesntExist,
      username
    );
  }

  updateUserName(username, password, newValue) {
    return this._updateUserByAttribute(
      username,
      password,
      'username',
      newValue
    );
  }

  updateUserPassword(username, password, newValue) {
    return this._updateUserByAttribute(
      username,
      password,
      'password',
      newValue
    );
  }

  updateUserEmail(username, password, newValue) {
    return this._updateUserByAttribute(username, password, 'email', newValue);
  }

  _updateUserByAttribute(username, password, attribute, value) {
    const result = this._usersList.updateUser(
      username,
      password,
      attribute,
      value
    );
    return new Response(
      result,
      result ? messages.success.update : messages.warning.userDoesntExist,
      username
    );
  }

  addPasswordItem(username, password, newPassword) {
    if (!username || !password || !newPassword) {
      return new Response(false, messages.errors.invalidArguments);
    }
    const result = this._usersList.addPasswordItem(
      username,
      password,
      newPassword
    );
    return new Response(
      result,
      result ? messages.success.update : messages.warning.userDoesntExist,
      newPassword
    );
  }

  removePasswordItem(username, password, index) {
    if (!username || !password || index === undefined) {
      return new Response(false, messages.errors.invalidArguments);
    }
    const result = this._usersList.removePasswordItem(
      username,
      password,
      index
    );
    return new Response(
      result,
      result ? messages.success.update : messages.warning.userDoesntExist,
      index
    );
  }

  updatePasswordItem(username, password, index, newPassword) {
    if (
      !username ||
      !password ||
      index === undefined ||
      newPassword === undefined
    ) {
      return new Response(false, messages.errors.invalidArguments);
    }
    const result = this._usersList.updatePasswordItem(
      username,
      password,
      index,
      newPassword
    );
    return new Response(
      result,
      result ? messages.success.update : messages.warning.userDoesntExist,
      index
    );
  }
}

const databasePath = '../Database/UsersDB.json';
const encoding = 'utf8';
const DB = JSON.parse(readFileSync(databasePath, encoding));

export const databaseHelper = new DatabaseHelper(DB, databasePath, encoding);
