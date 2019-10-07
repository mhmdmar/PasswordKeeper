import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AccountBarComponent } from './accountBar/account-bar.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './Services/auth.guard';
import { PasswordsTableComponent } from './passwords-table/passwords-table.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { PasswordFormComponent } from './password-form/password-form.component';
import { FormComponent } from './Components/form/form.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from './Components/table/table.component';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { IconComponent } from './Components/icon/icon.component';

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
        TableComponent,
        SearchComponent,
        IconComponent
    ],
    imports: [BrowserModule, KeyboardShortcutsModule.forRoot(), AppRoutingModule, RouterModule, HttpClientModule, NgbModule, FormsModule],
    providers: [AuthService, AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {}
