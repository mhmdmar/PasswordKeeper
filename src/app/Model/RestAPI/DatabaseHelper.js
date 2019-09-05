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
    return new Response(success, success ? user : messages.warning.userDoesntExist);
  }

  insertUser(username, password, email, passwordsList = []) {
    const userAdded = this._usersList.addUser(username, password, email, passwordsList);
    return new Response(userAdded, userAdded ? messages.success.entry : messages.warning.usernameTaken);
  }

  removeUser(username, password) {
    const userRemoved = this._usersList.removeUser(username,password);
    return new Response(userRemoved, userRemoved ? messages.success.deletion : messages.warning.userDoesntExist);
  }

  updateUser(username, password, attribute, value) {
    const userUpdated = this._usersList.updateUser(username, password, attribute, value);
    return new Response(userUpdated, userUpdated ? messages.success.update: messages.warning.userDoesntExist);
  }
}

module.exports = new DatabaseHelper();
