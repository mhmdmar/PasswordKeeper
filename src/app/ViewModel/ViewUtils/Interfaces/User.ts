import {Password} from './Password';

export interface User {
  username: string;
  password: string;
  domain: string;
  passwordsList: Array<Password>;
}
