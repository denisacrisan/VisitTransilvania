import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ApiHandler } from '../api-handler/apiHandler';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {
  userSubject = new BehaviorSubject({});
  userObservable = this.userSubject.asObservable();

  constructor(private apiHandler: ApiHandler) {
    this.fetchUserProfile();
  }

  fetchUserProfile() {
    this.apiHandler.getUserProfile()
    .pipe((response: any) => response)
    .subscribe((response: any) => {
      if (response.entity) {
        this.userSubject.next(response.entity);
      }});
  }

  getUserProfile(): Observable<any> {
    return this.userObservable;
  }
}
