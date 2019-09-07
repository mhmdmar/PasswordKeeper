import {routesNames} from './routeNames';
import {PasswordsTableComponent} from '../passwords-table/passwords-table.component';
import {AuthGuard} from '../../auth.guard';
import {HomeComponent} from '../home/home.component';
import {LoginComponent} from '../login/login.component';
import {SignupComponent} from '../signup/signup.component';
import {PasswordFormComponent} from '../password-form/password-form.component';

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
    path: '',
    redirectTo: routesNames.home,
    pathMatch: 'full'
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
  }
];
