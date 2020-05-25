export class PasswordItem {
    private _domain: string;
    private _username: string;
    private _password: string;
    constructor(domain, username, password) {
        this._domain = domain;
        this._username = username;
        this._password = password;
    }
    get domain(): string {
        return this._domain;
    }
    set domain(domain: string) {
        this._domain = domain;
    }
    get username(): string {
        return this._username;
    }
    set username(username: string) {
        this._username = username;
    }
    get password(): string {
        return this._password;
    }
    set password(password: string) {
        this._password = password;
    }
}
