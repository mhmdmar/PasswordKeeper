import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BoardComponent} from './ViewModel/board/board.component';
import {TopBarComponent} from './ViewModel/top-bar/top-bar.component';
import {SideBarComponent} from './ViewModel/side-bar/side-bar.component';
import {AccountBarComponent} from './ViewModel/accountBar/account-bar.component';
import {LoginComponent} from './ViewModel/login/login.component';
import {RouterModule} from '@angular/router';
import {AuthService} from './auth.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './auth.guard';
import {PasswordsTableComponent} from './ViewModel/passwords-table/passwords-table.component';
import {HomeComponent} from './ViewModel/home/home.component';
import {SignupComponent} from './ViewModel/signup/signup.component';
import {PasswordFormComponent} from './ViewModel/password-form/password-form.component';
import {FormComponent} from './ViewModel/form/form.component';
import {routes} from './ViewModel/Settings/routes';
import { UsersTableComponent } from './ViewModel/users-table/users-table.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    TopBarComponent,
    SideBarComponent,
    AccountBarComponent,
    LoginComponent,
    PasswordsTableComponent,
    HomeComponent,
    SignupComponent,
    PasswordFormComponent,
    FormComponent,
    UsersTableComponent,
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
