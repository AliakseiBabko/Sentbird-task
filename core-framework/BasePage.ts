import { Page } from '@playwright/test';
import { Header } from '../business/page-component/Header';
import { Footer } from '../business/page-component/Footer';
import { CookiesConsent } from '../business/page-component/CookiesConsent';

export class BasePage {
  readonly page: Page;

  protected header: Header;
  protected footer: Footer;
  protected cookiesConsent: CookiesConsent;

  constructor(page: Page) {
    this.page = page;
  }

  // Method to accept the cookies consent window
  async acceptCookies() {
    await this.cookiesConsent.acceptAllCookies();
  }

  // Method to reject cookies
  async rejectCookies() {
    await this.cookiesConsent.rejectAllCookies();
  }

  // Method to manage cookies
  async openManageCookies() {
    await this.cookiesConsent.openManageCookies();
  }
}
