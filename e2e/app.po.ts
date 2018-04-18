/*
 * Use the Page Object pattern to define the page under test.
 * See docs/coding-guide/e2e-tests.md for more info.
 */

import { browser, element, by } from 'protractor';

export class AppPage {
  emailField = element(by.css('input[formControlName="email"]'));
  passwordField = element(by.css('input[formControlName="password"]'));
  loginButton = element(by.css('button[type="submit"]'));

  constructor() {
    // Forces default language
    this.navigateTo();
  }

  navigateTo() {
    return browser.get('/');
  }

  login() {
    this.emailField.sendKeys('test@text.com');
    this.passwordField.sendKeys('123');
    this.loginButton.click();
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
