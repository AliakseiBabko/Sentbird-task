import { expect, type Locator, Page } from '@playwright/test';

export class CookiesConsent {
  readonly acceptAllButton: Locator;
  readonly rejectAllButton: Locator;
  readonly manageButton: Locator;

  constructor(page: Page) {
    // Locators for the buttons in the cookies consent banner
    this.acceptAllButton = page.locator('#ensAcceptAll');
    this.rejectAllButton = page.locator('#ensRejectAll');
    this.manageButton = page.locator('#ensOpenModal');
  }

  // Method to accept all cookies
  async acceptAllCookies() {
    await this.acceptAllButton.click();
  }

  // Method to reject all cookies
  async rejectAllCookies() {
    await this.rejectAllButton.click();
  }

  // Method to open the manage cookies modal (optional)
  async openManageCookies() {
    await this.manageButton.click();
  }
}
