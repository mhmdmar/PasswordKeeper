module.exports = class Username {
  constructor(username, password, email, passwordsList = []) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.passwordsList = passwordsList
  }
};
