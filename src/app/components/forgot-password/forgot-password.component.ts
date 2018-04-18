import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Logger, I18nService, AuthenticationService} from '@app/core';
import { finalize } from 'rxjs/operators';

const log = new Logger('Login');

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  version: string = environment.version;
  forgotPasswordForm: FormGroup;
  isLoading = false;
  hasError = false;
  error: any;
  errors: any;

  constructor(private i18nService: I18nService,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService) {
    this.createForm();
  }

  ngOnInit() {
  }

  forgotPassword() {
    this.isLoading = true;
    const data = this.forgotPasswordForm.value;

    this.authenticationService.forgotPassword(data)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe((response: any) => {
        this.isLoading = false;
        if (response.statusCode === 200) {
          this.hasError = false;
        } else {
          this.hasError = true;
        }
      }, (error: any) => {
        this.isLoading = false;
        console.warn(`Login error: `, error);
        this.error = error;
        this.errors = error.error.errors;
      });
  }

  private createForm() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

}
