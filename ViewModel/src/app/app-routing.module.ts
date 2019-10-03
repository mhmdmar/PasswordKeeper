import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Route} from '@angular/router';
import {routesNames} from './ViewUtils/Objects/routeNames';
import {PasswordsTableComponent} from './passwords-table/passwords-table.component';
import {AuthGuard} from './Services/auth.guard';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {UsersTableComponent} from './users-table/users-table.component';
import {PasswordFormComponent} from './password-form/password-form.component';

const routes: Array<Route> = [
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
    path: routesNames.usersTable,
    component: UsersTableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: routesNames.passwordForm,
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
