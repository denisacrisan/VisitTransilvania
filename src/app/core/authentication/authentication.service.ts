import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiHandler } from '../api-handler/apiHandler';
import { StorageService } from '../storage/storage.service';

export interface Credentials {
  email: string;
  token: string;
}

export interface LoginContext {
  email: string;
  password: string;
  remember?: boolean;
}

export interface ForgotPasswordContext {
    email: string;
}

export interface ResetPasswordContext {
    code: string;
    email: string;
    newPassword: string;
    confirmNewPassword: string;
}

export interface RegisterContext {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

export interface RegisterGHContext {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    hotelName: string;
    website: string;
    county: string;
    city: string;
    password: string;
    confirmPassword: string;
}

const credentialsKey = 'credentials';

const routes = {
  login: '/token',
  forgotPassword: '/User/ForgotPassword',
  resetPassword: '/User/ResetPassword'
};

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService implements OnInit {

  private _credentials: Credentials | null;

  constructor(
      private httpClient: HttpClient,
      private storageService: StorageService,
      private apiHandler: ApiHandler
  ) {
    const savedCredentials = this.storageService.getCredentials();
    if (savedCredentials) {
      this._credentials = savedCredentials;
    }
  }

  ngOnInit() {
  }

  /**
   * Authenticates the user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    const data = {
      email: context.email,
      password: context.password,
      granttype: 'password'
    };

     const res = this.apiHandler.postLogin(data)
      .pipe((response: any) => {
        response.subscribe( (responseBody: any) => {
          if (responseBody.entity) {
            this.setCredentials(responseBody.entity);
          }
        });
        return response.entity ? response.entity : response;
      });
    return res;
  }


  forgotPassword(context: ForgotPasswordContext) {
    const data = {
        email: context.email,
    };

    return this.apiHandler.forgotPassword(data);
  }

  resetPassword(context: ResetPasswordContext) {
    const data = {
        email: context.email,
        newPassword: context.newPassword,
        confirmNewPassword: context.confirmNewPassword,
        code: context.code
    };

    return this.apiHandler.resetPassword(data);
  }

  register(context: RegisterContext) {
      const data = {
          firstName: context.firstName,
          lastName: context.lastName,
          email: context.email,
          phone: context.phone,
          password: context.password,
          confirmPassword: context.confirmPassword
      };

      // return this.apiHandler.register(data);
  }

    registerGH (context: RegisterGHContext) {
        const data = {
            firstName: context.firstName,
            lastName: context.lastName,
            email: context.email,
            phone: context.phone,
            hotelName: context.hotelName,
            website: context.website,
            county: context.county,
            city: context.city,
            password: context.password,
            confirmPassword: context.confirmPassword
        };

        // return this.apiHandler.registerGH(data);
    }

  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.storageService.emptyCredentials();
    return of(true);
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.storageService.getCredentials();
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param {Credentials=} credentials The user credentials.
   * @param {boolean=} remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: Credentials) {
    this.storageService.setCredentials(credentials);
  }

}
