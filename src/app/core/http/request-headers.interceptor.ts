import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from './../authentication/authentication.service';
import { StorageService } from './../storage/storage.service';

/**
 * Prefixes all requests with `environment.serverUrl`.
 */
@Injectable()
export class RequestHeadersInterceptor implements HttpInterceptor {

    constructor(
  private authService: AuthenticationService, 
  private storageService: StorageService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const credentials = this.storageService.getCredentials();

      console.log('CREDENTIALS RIGHT NOW', credentials);
        let headers = new HttpHeaders();
        if (credentials) {
            headers = new HttpHeaders()
                .set('Content-Type', 'application/json')
                .append('Accept', 'application/json')
                .append('Authorization', `Bearer ${credentials.accessToken}`);
        } else {
            headers = new HttpHeaders()
                .set('Content-Type', 'application/json')
                .append('Accept', 'application/json');
        }

        const finalRequest = request.clone({
            headers: headers
        });

        return next.handle(finalRequest);
    }

}
