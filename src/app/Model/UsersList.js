const Username = require("./User");
const secretPassword = "admin";
const messages = require("../Utils/Messages");

module.exports = class UsersList {
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

  getUserIndex(username, password = secretPassword) {
    let index = -1;
    this._forEachUserInList((user, i) => {
      if (user.username === username && (password === secretPassword || user.password === password)) {
        index = i;
      }
    });
    return index;
  }

  getUser(username, password) {
    const userIndex = this.getUserIndex(username, password);
    const found = userIndex !== -1;
    return {
      success: found,
      result: found ? this._users[userIndex] : messages.warning.userDoesntExist
    };
  }

  static checkArguments(args) {
    for (let i = 0, len = args.length; i < len; i++) {
      const curArgument = args[i];
      if (!curArgument || curArgument === '') {
        return false;
      }
    }
    return true;
  }

  addUser(username, password, email, passwordsList = []) {
    const validArguments = UsersList.checkArguments([username, password, email]);
    if (!validArguments) {
      return messages.errors.invalidArguments;
    }

    if (this.userNameTaken(username)) {
      return messages.warning.usernameTaken;
    }
    this._users.push(new Username(username, password, email, passwordsList));
    return messages.success.entry;
  }

  addUsers(list) {
    if (!Array.isArray(list)) {
      return messages.errors.invalidArguments;
    }
    const resultMessages = [];
    for (let i = 0, len = list.length; i < len; i++) {
      const curUser = list[i];
      const resultMessage = this.addUser(curUser.username, curUser.password, curUser.email, curUser.passwordsList);
      resultMessages.push(curUser.username.concat("   ", resultMessage));
    }
    return resultMessages;
  }

  removeUser(username, password) {
    const userIndex = this.getUserIndex(username, password);
    if (userIndex === -1) {
      return messages.warning.userDoesntExist;
    }
    this._users.splice(userIndex, 1);
    return messages.success.deletion;
  }

  removeUsers(list) {
    if (!Array.isArray(list)) {
      return messages.errors.invalidArguments;
    }
    const resultMessages = [];
    for (let i = 0, len = list.length; i < len; i++) {
      const curUser = list[i];
      const resultMessage = this.removeUser(curUser.username, curUser.password);
      resultMessages.push(curUser.username.concat("   ", resultMessage));
    }
    return resultMessages;
  }

  userNameTaken(username) {
    return this.getUserIndex(username) > -1;
  }

  userExists(username, password) {
    return this.getUserIndex(username, password) > -1;
  }

};
