import {routesNames} from './routeNames';
import {PasswordsTableComponent} from '../passwords-table/passwords-table.component';
import {AuthGuard} from '../auth.guard';
import {HomeComponent} from '../home/home.component';
import {LoginComponent} from '../login/login.component';
import {SignupComponent} from '../signup/signup.component';
import {PasswordFormComponent} from '../password-form/password-form.component';
import {UsersTableComponent} from '../users-table/users-table.component';
import {PasswordChangeFormComponent} from '../password-change-form/password-change-form.component';

export const routes = [
  {
    path: routesNames.passwordTable,
    component: PasswordsTableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: routesNames.home,
    component: HomeComponent
  },
  {
    path: routesNames.login,
    component: LoginComponent
  },
  {
    path: routesNames.signUp,
    component: SignupComponent
  },
  {
    path: routesNames.passwordForm,
    component: PasswordFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: routesNames.usersTable,
    component: UsersTableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: routesNames.passwordChangeForm,
    component: PasswordChangeFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: HomeComponent,
  },
];
