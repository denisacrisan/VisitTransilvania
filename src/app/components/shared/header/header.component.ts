import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../core/authentication/authentication.service';
import { I18nService } from '../../../core/i18n.service';

import { UserService } from '../../../core/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuHidden = true;
  name = '';
  user$: any;

  constructor(private router: Router,
              private userService: UserService,
              private authenticationService: AuthenticationService,
              private i18nService: I18nService) { }

  ngOnInit() {
    this.user$ = this.userService.getUserProfile();
    this.user$.subscribe(console.log)
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    this.authenticationService.logout()
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get email(): string | null {
    const credentials = this.authenticationService.credentials;
    return credentials ? credentials.email : null;
  }

}
