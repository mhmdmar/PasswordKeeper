import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BoardComponent} from './ViewModel/board/board.component';
import {TopBarComponent} from './ViewModel/top-bar/top-bar.component';
import {SideBarComponent} from './ViewModel/side-bar/side-bar.component';
import {FormComponent} from './ViewModel/form/form.component';
import {AccountComponent} from './ViewModel/account/account.component';
import {LoginComponent} from './ViewModel/login/login.component';
import {HomeComponent} from './ViewModel/home/home.component';
import {RouterModule} from '@angular/router';
import {AuthService} from './auth.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './auth.guard';
import {PasswordsTableComponent} from './ViewModel/passwords-table/passwords-table.component';

const routes = [
  {
    path: '',
    component: PasswordsTableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    TopBarComponent,
    SideBarComponent,
    FormComponent,
    AccountComponent,
    LoginComponent,
    HomeComponent,
    PasswordsTableComponent,
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
