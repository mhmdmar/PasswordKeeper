import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BoardComponent} from './ViewModel/board/board.component';
import {TopBarComponent} from './ViewModel/top-bar/top-bar.component';
import {SideBarComponent} from './ViewModel/side-bar/side-bar.component';
import {AccountComponent} from './ViewModel/account/account.component';
import {LoginComponent} from './ViewModel/login/login.component';
import {RouterModule} from '@angular/router';
import {AuthService} from './auth.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './auth.guard';
import {PasswordsTableComponent} from './ViewModel/passwords-table/passwords-table.component';
import {HomeComponent} from './ViewModel/home/home.component';
import {routesNames} from './routeNames';
import {SignupComponent} from './ViewModel/signup/signup.component';
import {PasswordFormComponent} from './ViewModel/password-form/password-form.component';
import {FormComponent} from './ViewModel/form/form.component';

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

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    TopBarComponent,
    SideBarComponent,
    AccountComponent,
    LoginComponent,
    PasswordsTableComponent,
    HomeComponent,
    SignupComponent,
    PasswordFormComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [
    AuthService, AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
