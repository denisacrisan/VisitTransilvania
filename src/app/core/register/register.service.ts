import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class RegisterService {

  private centersSubject = new BehaviorSubject([]);
  public centersObservable: any;
  
  constructor() { 
    this.centersObservable = this.centersSubject.asObservable();
  }

  getCenters() {
    //
  }
  
}
