import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Route} from '@angular/router';
import {routesPath} from './ViewUtils/Objects/routeNames';
import {PasswordsTableComponent} from './passwords-table/passwords-table.component';
import {AuthGuard} from './auth.guard';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {UsersTableComponent} from './users-table/users-table.component';
import {PasswordFormComponent} from './password-form/password-form.component';

const routes: Array<Route> = [
  {
    path: routesPath.passwordTable,
    component: PasswordsTableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: routesPath.home,
    component: HomeComponent
  },
  {
    path: routesPath.login,
    component: LoginComponent
  },
  {
    path: routesPath.signUp,
    component: SignupComponent
  },
  {
    path: routesPath.usersTable,
    component: UsersTableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: routesPath.passwordForm,
    component: PasswordFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: HomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
