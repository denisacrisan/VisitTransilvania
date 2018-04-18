import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { StorageService } from '../storage/storage.service'
import routes from './routes.const';

@Injectable()
export class ApiHandler {
  constructor (private httpClient: HttpClient, private storageService: StorageService) {}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// REQUEST DECLARATIONS; Custom error handling, and parametrizing possible here.

  postLogin (payload: any): any {
    return this.postRequest('LOGIN', payload);
  }

  postRefresh (): any {
    const data = {
      'grantType': 'refresh_token',
      'refreshToken' : this.storageService.getCredentials().refreshToken
    };

    return this.postRequest('LOGIN', data);
  }

  resetPassword (data: any): any {
    return this.postRequest('RESET_PASSWORD', data);
  }

  forgotPassword (data: any): any {
    return this.postRequest('FORGOT_PASSWORD', data);
  }

  getCentersOfInterest(data?: any): Observable<any> {
    /* DEFAULT OBJECT PROPERTIES; in this case request params
    *  The code below will create an object with the default properties for parameters
    *  The properties from 'data' will be added to it, overwriting if necessary. */
    const defaultParams = {
      'itemsPerPage': 100,
      'search': 'a'
    };
    const payload = Object.assign(defaultParams, data);

    return this.getRequest('CENTERS_OF_INTEREST', payload);
  }

  getUserProfile(data?: any): Observable<any> {
    const defaultParams = {
      'isPublic': 'false'
    };
    const payload = Object.assign(defaultParams, data);

    return this.getRequest('USER_PROFILE', payload);
  }



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// GENERIC REQUEST HANDLING; simplifies the code used in the other functions.
  getRequest(requestRoute: string, requestParams: any = null) {
    const params = requestParams ? new HttpParams({
      fromObject: requestParams
    }) : '';

    return this.doRequest('GET', `${routes[requestRoute]}?${params.toString()}`,{});
  }

  postRequest(requestRoute: string, payload: any = {}) {
    return this.doRequest('POST', routes[requestRoute], payload);
  }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // GENERIC REQUEST HANDLING
  doRequest(requestType: any, requestRoute: any, requestBody: any): any {
    const requestSubject = new BehaviorSubject<any>({});
    const request$ = requestSubject.asObservable();

    switch (requestType) {
      case 'GET':
        this.httpClient.get(requestRoute).subscribe(
          (response: any) => {
            if (response.entity) {
              requestSubject.next(response);
            }
          },
          (error) => {
            this.catchAuthError(error, requestType, requestRoute, requestSubject, requestBody);
          });
        break;
      case 'POST':
        this.httpClient.post(requestRoute, requestBody).subscribe(
          (response: any) => {
            if (response.entity) {
              requestSubject.next(response);
            }
          },
          (error) => {
            this.catchAuthError(error, requestType, requestRoute, requestSubject, requestBody);
          });
        break;
      case 'PUT':
        this.httpClient.put(requestRoute, requestBody).subscribe(
          (response: any) => {
            if (response.entity) {
              requestSubject.next(response);
            }
          },
          (error) => {
            this.catchAuthError(error, requestType, requestRoute, requestSubject, requestBody);
          });
        break;
      case 'DELETE':
        this.httpClient.delete(requestRoute, requestBody).subscribe(
          (response: any) => {
            if (response.entity) {
              requestSubject.next(response);
            }
          },
          (error) => {
            this.catchAuthError(error, requestType, requestRoute, requestSubject, requestBody);
          });
        break;
      case 'PATCH':
        this.httpClient.patch(requestRoute, requestBody).subscribe(
          (response: any) => {
            if (response.entity) {
              requestSubject.next(response);
            }
          },
          (error) => {
            this.catchAuthError(error, requestType, requestRoute, requestSubject, requestBody);
          });
        break;
    }

    return request$;
  }

  catchAuthError(error: any, requestType: any, requestRoute: any, requestSubject: any, requestBody: any) {
    if (error.status === 401) {
      this.postRefresh().subscribe( (response: any) => {
        if (response.entity) {
          const credentials = this.storageService.getCredentials();

          credentials.accessToken = response.entity ? response.entity.accessToken : '';
          credentials.refreshToken = response.entity ? response.entity.refreshToken : '';
          this.storageService.setCredentials(credentials);

          this.doRequest(requestType, requestRoute, requestBody).subscribe(
            (authorizedResponse: any) => {
              requestSubject.next(authorizedResponse);
            });
        } else {
          requestSubject.next(response);
        }
      });
    } else {
      requestSubject.next(error);
    }
  }
}
