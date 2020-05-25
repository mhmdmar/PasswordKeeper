import * as pg from "pg";
import {Response} from "../Utils/ResponseMessage";
import * as messages from "../Utils/Messages.json";

const Client: pg.Client = pg.Client;

const postgresClient = {
    username: "postgres",
    password: "1234567qweasD",
    host: "localhost",
    port: "5000",
    database: "PasswordKeeper"
};

class DatabaseHelperSQL {
    public client: pg;
    public latestId: number;

    constructor() {
        this.client = new Client({
            host: postgresClient.host,
            port: postgresClient.port,
            database: postgresClient.database,
            user: postgresClient.username,
            password: postgresClient.password
        });
        this.latestId = 0;
        this._setLatestId();
    }
    async query(query) {
        let result;
        try {
            result = (await this.client.query(query)).rows;
        } catch (e) {
            result = null;
        } finally {
        }
        return result;
    }
    async getUsers(permission) {
        if (!permission || permission.toString() !== "1") {
            return new Response(200, false, messages.warning.unauthorized, null);
        }
        const users = await this.query(`SELECT * FROM "Users" ORDER BY permission`);
        if (users === null) {
            return new Response(500, false, messages.errors.serverError, null);
        }
        return new Response(200, true, messages.success.success, users);
    }

    async _getUser(email: string | undefined) {
        if (!email) {
            return null;
        }
        let user = await this.query(`SELECT * FROM "Users" WHERE "email" = '${email}'`);
        if (!user || !user[0]) {
            return null;
        }
        return user[0];
    }
    async getUser(email, password) {
        if (!email) {
            return new Response(200, false, messages.warning.invalidArguments, null);
        }
        let user = await this.query(
            `SELECT * FROM "Users" WHERE "email" = '${email}' AND  "password" = '${password}';`
        );
        if (!user || user.length === 0) {
            return new Response(200, false, messages.warning.userDoesntExist, null);
        }
        user = user[0];
        user.passwordsList = await this.getUserPasswords(email);
        return new Response(200, true, messages.success.userExists, user);
    }
    async updateUser(email, newUser) {
        if (!email || !newUser) {
            return new Response(
                200,
                false,
                messages.errors.invalidArguments,
                messages.errors.invalidArguments
            );
        }
        const username = newUser.username;
        const password = newUser.password;
        const userEmail = newUser.email;
        const permission = newUser.permission;
        if (!username || !password || !userEmail || !permission) {
            return new Response(
                200,
                false,
                messages.errors.invalidArguments,
                messages.errors.invalidArguments
            );
        }
        const result = await this.query(
            `UPDATE "Users" SET username='${username}', password='${password}', email='${userEmail}', permission='${permission}' WHERE email='${email}';`
        );
        if (!result) {
            return new Response(200, false, messages.errors.serverError, newUser);
        }
        return new Response(200, true, messages.success.update, newUser);
    }

    async insertUser(username, password, email, passwordsList = [], permission = 3) {
        const user = await this._getUser(email);
        if (user) {
            return new Response(200, false, messages.warning.emailTaken, null);
        }
        const result = await this.query(
            `INSERT INTO "Users"(username, password, email, permission) VALUES ('${username}', '${password}', '${email}', ${permission});`
        );
        if (!result) {
            return new Response(500, false, messages.errors.serverError, null);
        }
        if (passwordsList && passwordsList.length) {
            let stringifiedPasswords = "";
            /* turn array of objects to array of strings to fit the insert into query,
            for example instead of { email: 'ff', password: 'ff', domain: 'ff' } to "(ff,ff,ff,f)" */
            for (let i = 0; i < passwordsList.length; i++) {
                const curPassword = passwordsList[i];
                const stringifiedPassword = `( '${curPassword.username}', '${curPassword.password}','${curPassword.domain}', '${email}')`;
                stringifiedPasswords += stringifiedPassword + ",";
            }
            stringifiedPasswords = stringifiedPasswords.slice(
                0,
                stringifiedPasswords.length - 1
            );
            const result = await this.query(
                `INSERT INTO "Passwords"( username, password, domain, "email") VALUES ${stringifiedPasswords};`
            );
            if (!result) {
                new Response(
                    200,
                    true,
                    messages.warning.invalidArguments,
                    JSON.stringify(passwordsList)
                );
            }
        }
        return new Response(200, true, messages.success.success, username);
    }

    async removeUser(email) {
        if (!email) {
            return new Response(
                200,
                false,
                messages.errors.invalidArguments,
                messages.errors.invalidArguments
            );
        }
        const result = await this.query(`DELETE FROM "Users" WHERE email= '${email}'`);
        if (!result) {
            return new Response(500, false, messages.errors.serverError, null);
        }
        return new Response(200, true, messages.success.passwordRemoved, null);
    }
    // Passwords Table
    async _setLatestId() {
        const idsList = (await this.query(
            `SELECT id FROM "Passwords" ORDER BY "id"`
        )).map(idObj => idObj.id);
        this.latestId = idsList[idsList.length - 1] + 1;
    }
    async getUserPasswords(email) {
        return this.query(
            `SELECT username,password,domain,id FROM "Passwords" WHERE "email" = '${email}' ORDER BY id`
        );
    }
    async addPasswordItem(email, password, newPassword) {
        const id = this.latestId++;
        const result = await this
            .query(`INSERT INTO "Passwords" (username, password, domain, "email", id) VALUES ('${newPassword.username}'
        ,'${newPassword.password}','${newPassword.domain}','${email}',${id});`);
        if (!result) {
            return new Response(500, false, messages.warning.invalidArguments, null);
        }
        newPassword.id = id; // add the id to the item for a correct response
        return new Response(200, true, messages.success.update, newPassword);
    }
    async removePasswordItem(email, password, id) {
        if (!email || !password || id === undefined) {
            return new Response(
                200,
                false,
                messages.errors.invalidArguments,
                messages.errors.invalidArguments
            );
        }
        const result = await this.query(`DELETE FROM "Passwords" WHERE id= ${id}`);
        if (!result) {
            return new Response(500, false, messages.errors.serverError, null);
        }
        return new Response(200, true, messages.success.passwordRemoved, null);
    }
    async updatePasswordItem(email, password, newPassword) {
        if (
            !email ||
            !password ||
            newPassword === undefined ||
            newPassword.id === undefined
        ) {
            return new Response(
                200,
                false,
                messages.errors.invalidArguments,
                messages.errors.invalidArguments
            );
        }
        const id = newPassword.id;
        const result = await this.query(
            `UPDATE "Passwords" SET username='${newPassword.username}', password='${newPassword.password}', domain='${newPassword.domain}' WHERE "id"='${id}';`
        );
        return new Response(
            200,
            result,
            result ? messages.success.update : messages.warning.userDoesntExist,
            newPassword
        );
    }
    async getPasswords(
        username: string,
        password: string,
        startRange: number,
        endRange: number
    ) {
        return this.getUserPasswords(username);
    }

    connect() {
        this.client.connect();
    }
    closeConnection() {
        this.client.end();
    }
}

export const databaseHelperSQL = new DatabaseHelperSQL();
