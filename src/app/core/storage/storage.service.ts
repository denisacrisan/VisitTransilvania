import { Injectable } from '@angular/core';
const CREDENTIALS_KEY = 'credentials';

@Injectable()
export class StorageService {
  _storage = sessionStorage;
  _remember = false;
  _credentials = {};
  constructor () {}

  getCredentials(): any {
    this._storage.getItem(CREDENTIALS_KEY);
    return JSON.parse(this._storage.getItem(CREDENTIALS_KEY));
  }

  setCredentials(newCredentials: any): any {
    console.log("NEWC",newCredentials);
    if (newCredentials) {
      this._remember = newCredentials.remember;
      this._storage = this._remember ? localStorage : sessionStorage;
      const currentCredentials = this.getCredentials();

      const finalCredentials = currentCredentials?Object.assign(currentCredentials, newCredentials):newCredentials;
      this._storage.setItem(CREDENTIALS_KEY, JSON.stringify(finalCredentials));
    } else {
      this.emptyCredentials();
    }
  }

  emptyCredentials() {
    console.log("logo =sec")
    sessionStorage.removeItem(CREDENTIALS_KEY);
    localStorage.removeItem(CREDENTIALS_KEY);
  }
}

