const fs = require("fs");
const encoding = "utf8";
const databasePath = "../Database/UsersDB";
const DB = require(databasePath);
const UsersList = require("../UsersList");
const messages = require("../../Utils/Messages");
const Response = require("../../Utils/Response");

class DatabaseHelper {
  constructor() {
    this._DB = DB;
    this._usersList = new UsersList(this._DB.Users);
  }

  get DB() {
    return this._DB;
  }

  saveDB() {
    const stringifiedDB = JSON.stringify(this._DB);
    fs.writeFile(databasePath + ".json", stringifiedDB, encoding, function (err) {
      if (err) {
        throw err;
      }
    });
  }

  getUsers() {
    return new Response(true, messages.success.users, this._usersList.users);
  }

  getUser(username, password) {
    const user = this._usersList.getUser(username, password);
    const success = user !== undefined;
    return new Response(success, success ? messages.success.userExists : messages.warning.userDoesntExist, user, success ? user : null);
  }

  insertUser(username, password, email, passwordsList = []) {
    const result = this._usersList.addUser(username, password, email, passwordsList, 3);
    return new Response(result, result ? messages.success.entry : messages.warning.usernameTaken, username);
  }

  removeUser(username, password) {
    const result = this._usersList.removeUser(username, password);
    return new Response(result, result ? messages.success.deletion : messages.warning.userDoesntExist, username);
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

  _updateUserByAttribute(username, password, attribute, value) {
    const result = this._usersList.updateUser(username, password, attribute, value);
    return new Response(result, result ? messages.success.update : messages.warning.userDoesntExist, username);
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

module.exports = new DatabaseHelper();
