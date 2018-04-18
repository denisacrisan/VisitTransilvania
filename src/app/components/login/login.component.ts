import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService, Credentials } from '@app/core';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  version: string = environment.version;
  error: string;
  errors: string[];
  loginForm: FormGroup;
  isLoading = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private i18nService: I18nService,
              private authenticationService: AuthenticationService) {
    this.createForm();
  }

  ngOnInit() { }

  login() {
    this.isLoading = true;
    this.authenticationService.login(this.loginForm.value)
      .pipe(finalize(() => {
        this.loginForm.markAsPristine();
        this.isLoading = false;
      }))
      .subscribe((data: any) => {
        if (data.entity) {
          this.isLoading = false;
          this.router.navigate(['/'], { replaceUrl: true });
          log.debug(`${data.entity.email} success fully logged in`);
        } else if (data.error && data.error.errors && data.error.errors.length) {
          this.isLoading = false;
          log.debug(`Login error: ${data}`);
          this.error = data;
          this.errors = data.error.errors;
        }
      }, error => {
        // TODO: error not being caught here. find out why and properly handle the error
        // log.debug(`Login error: ${error}`);
        // this.error = error;
        // this.errors = error.error.errors;
      });
  }


  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }

}
