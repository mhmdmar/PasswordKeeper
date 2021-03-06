import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { routesNames } from '../ViewUtils/Objects/routeNames';
import { FormTemplate } from '../ViewUtils/Interfaces/Templates/FormTemplate';
import { Response } from '../ViewUtils/Interfaces/Response';
import { FormValidation } from '../ViewUtils/Interfaces/FormValidation';
import { inputUtils } from '../ViewUtils/Objects/DOM_Utils/DOM_Elements/Input';
import { icons } from '../ViewUtils/Objects/Icons';

@Component({
    selector: 'app-login',
    template: `
        <app-form [template]="template"></app-form>
    `
})
export class LoginComponent implements OnInit {
    public submitText: string;
    public email: string;
    public password: string;
    public template: FormTemplate;
    public testID = {
        usernameInput: 'usernameInput',
        passwordInput: 'passwordInput',
        loginBtn: 'loginBtn',
        signupBtn: 'signupBtn'
    };

    constructor(private Auth: AuthService, private router: Router) {}

    static logInError(message): void {
        alert(message);
    }

    getData(): FormTemplate {
        return {
            inputs: [
                {
                    class: 'formInput',
                    type: 'text',
                    field: 'Email',
                    testID: this.testID.usernameInput,
                    placeholder: 'Email',
                    callback: ($event): void => (this.email = $event.target.value)
                },
                {
                    class: 'formInput',
                    type: 'password',
                    field: 'Password',
                    testID: this.testID.passwordInput,
                    placeholder: 'Password',
                    callback: ($event): void => (this.password = $event.target.value),
                    itemsUtils: [
                        {
                            Icon: icons.showPassword,
                            callback: (i): void => inputUtils.toggleInputType(this.template.inputs[i])
                        }
                    ]
                },
                {
                    class: 'formInput formButton',
                    type: 'button',
                    value: 'Login',
                    testID: this.testID.loginBtn,
                    callback: (): void => this.login()
                }
            ],
            alternativeRoute: {
                alternativeText: 'click to sign up',
                testID: this.testID.signupBtn,
                callback: (): Promise<boolean> => this.router.navigate([routesNames.signUp])
            }
        };
    }

    ngOnInit(): void {
        this.email = this.password = '';
        this.submitText = 'click to sign up';
        this.template = this.getData();
    }

    login(): void {
        const validateForm: FormValidation = this.validateForm();
        if (validateForm.valid) {
            this.Auth.login(this.email, this.password, (data: Response) => {
                if (data.success) {
                    this.router.navigate([routesNames.passwordTable]);
                } else {
                    LoginComponent.logInError(data.message);
                }
            });
        } else {
            LoginComponent.logInError(validateForm.message);
        }
    }

    emptyInputExists(): boolean {
        return this.email === '' || this.password === '';
    }

    validateForm(): FormValidation {
        let valid = false;
        if (this.emptyInputExists()) {
            return {
                valid,
                message: 'Not all fields are filled'
            };
        }
        valid = true;
        return {
            valid,
            message: 'success'
        };
    }

    signUp(): void {
        this.router.navigate([routesNames.signUp]);
    }
}
