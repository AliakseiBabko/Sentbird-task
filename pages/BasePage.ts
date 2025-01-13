import { Page } from '@playwright/test';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookiesConsent } from './CookiesConsent';

export class BasePage {
  readonly page: Page;

  protected header: Header;
  protected footer: Footer;
  protected cookiesConsent: CookiesConsent;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.footer = new Footer(page);
    this.cookiesConsent = new CookiesConsent(page);
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