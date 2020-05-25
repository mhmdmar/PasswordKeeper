import {Password} from "../../ViewModel/src/app/ViewUtils/Interfaces/Password";

export class User {
    private _username: string;
    private _password: string;
    private _email: string;
    private _passwordsList: Password[];
    private _permission: number;

    constructor(
        username: string,
        password: string,
        email: string,
        passwordsList: Password[] = [],
        permission: number
    ) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.passwordsList = passwordsList;
        this.permission = permission;
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
    get email(): string {
        return this._email;
    }
    set email(email: string) {
        this._email = email;
    }
    get permission(): number {
        return this._permission;
    }
    set permission(permission: number) {
        this._permission = permission;
    }
    get passwordsList(): Password[] {
        return this._passwordsList;
    }
    set passwordsList(passwordsList) {
        this._passwordsList = passwordsList;
    }
}
