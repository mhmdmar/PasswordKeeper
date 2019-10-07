import { Password } from './Password';

export interface User {
    username: string;
    password: string;
    email: string;
    passwordsList: Array<Password>;
    permission: number;
}
