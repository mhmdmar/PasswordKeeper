const path = require("./Paths");
const fs = require("fs");
const encoding = "utf8";
const databasePath = path.DatabasePath.concat("/", path.UsersDB);
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
    return this._usersList;
  }

  getUser(username, password) {
    const user = this._usersList.getUser(username, password);
    const success = user !== undefined;
    return new Response(success, success ? messages.success.userExists : messages.warning.userDoesntExist, user, success ? user : null);
  }

  insertUser(username, password, email, passwordsList = []) {
    const userAdded = this._usersList.addUser(username, password, email, passwordsList);
    return new Response(userAdded, userAdded ? messages.success.entry : messages.warning.usernameTaken, username);
  }

  removeUser(username, password) {
    const userRemoved = this._usersList.removeUser(username, password);
    return new Response(userRemoved, userRemoved ? messages.success.deletion : messages.warning.userDoesntExist, username);
  }

  updateUser(username, password, attribute, value) {
    const userUpdated = this._usersList.updateUser(username, password, attribute, value);
    return new Response(userUpdated, userUpdated ? messages.success.update : messages.warning.userDoesntExist, username);
  }

  updatePasswords(username, password, newPassword) {
    if (!username || !password || !newPassword) {
      return new Response(false, messages.errors.invalidArguments);
    }
    const userPasswordsUpdates = this._usersList.updateUserPasswords(username, password, newPassword);
    return new Response(userPasswordsUpdates, userPasswordsUpdates ? messages.success.update : messages.warning.userDoesntExist, newPassword);
  }

  removePassword(username, password, index) {
    if (!username || !password || index === undefined) {
      return new Response(false, messages.errors.invalidArguments);
    }
    const userRemovePassword = this._usersList.removeUserPassword(username, password, index);
    return new Response(userRemovePassword, userRemovePassword ? messages.success.update : messages.warning.userDoesntExist, index);
  }
}

module.exports = new DatabaseHelper();
