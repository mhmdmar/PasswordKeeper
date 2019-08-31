const path = require("./Paths");
const fs = require("fs");
const encoding = "utf8";
const databasePath = path.DatabasePath.concat("/", path.UsersDB);
const DB = require(databasePath);
const UsersList = require("../UsersList");

module.exports = DB;

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

  _forEachUserInDB(callback) {
    for (const user in this._DB) {
      if (this._DB.hasOwnProperty(user)) {
        callback(this._DB[user]);
      }
    }
  }

  getUsers() {
    return this._usersList;
  }

  getUser(username, password) {
    return this._usersList.getUser(username, password);
  }

  insertUser(username, password, email, passwordsList = []) {
    return this._usersList.addUser(username, password, email, passwordsList);
  }

  insertUsers(list) {
    return this._usersList.addUsers(list);
  }

  removeUser(username, password) {
    return this._usersList.removeUser(username, password);
  }

  removeUsers(list) {
    return this._usersList.removeUsers(list);
  }
}

module.exports = new DatabaseHelper();
