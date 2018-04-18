import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { I18nService, AuthenticationService} from '@app/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import {Router, ActivatedRoute, Params, RoutesRecognized} from '@angular/router';


@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    version: string = environment.version;
    resetPasswordForm: FormGroup;
    isLoading = false;
    emailError = false;
    passwordsError = false;
    error = '';
    errors = '';
    private codeParam = '';
    constructor(private i18nService: I18nService,
                private formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private authenticationService: AuthenticationService) {
        this.createForm();
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            this.codeParam = params['code'];
        });
    }
    resetPassword() {
        this.isLoading = true;
        const data = this.resetPasswordForm.value;
        data.code = this.codeParam.replace(/ /g, '+');

        this.authenticationService.resetPassword(data)
            .pipe(finalize(() => {
                this.isLoading = false;
            }))
            .subscribe((response: any) => {
                this.isLoading = false;
                if (data.newPassword !== data.confirmNewPassword) {
                    this.passwordsError = true;
                }
                if (response.error && response.error.errors && response.error.errors.length) {
                  console.warn(`Login error: `, response);
                  this.error = response;
                  this.errors = response.error.errors;
                }
            },
            (error: any) => {
                this.isLoading = false;
                console.warn(`Login error: `, error);
                this.error = error;
                this.errors = error.error.errors;
            });
    }

    private createForm() {
        this.resetPasswordForm = this.formBuilder.group({
            email: ['', Validators.required],
            newPassword: ['', Validators.required],
            confirmNewPassword: ['', Validators.required]
        });
    }
}
