import {routesNames} from './routeNames';
import {PasswordsTableComponent} from '../../passwords-table/passwords-table.component';
import {AuthGuard} from '../../auth.guard';
import {HomeComponent} from '../../home/home.component';
import {LoginComponent} from '../../login/login.component';
import {SignupComponent} from '../../signup/signup.component';
import {PasswordFormComponent} from '../../password-form/password-form.component';
import {UsersTableComponent} from '../../users-table/users-table.component';

const getPath = (route) => {
  return route.value + (route.param ? route.param : '');
};
export const routes = [
  {
    path: getPath(routesNames.passwordTable),
    component: PasswordsTableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: getPath(routesNames.home),
    component: HomeComponent
  },
  {
    path: getPath(routesNames.login),
    component: LoginComponent
  },
  {
    path: getPath(routesNames.signUp),
    component: SignupComponent
  },
  {
    path: getPath(routesNames.usersTable),
    component: UsersTableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: getPath(routesNames.passwordForm),
    component: PasswordFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: HomeComponent,
  },
];
