export class User {
    constructor(username, password, email, passwordsList = [], permission) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.passwordsList = passwordsList;
        this.permission = permission;
    }
}