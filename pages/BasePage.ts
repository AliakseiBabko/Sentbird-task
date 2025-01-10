import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Method to accept the cookies consent window
  async acceptCookies() {
    const acceptButton = this.page.getByLabel('Accept All');
    if (await acceptButton.isVisible()) {
      await acceptButton.click();
    }
  }
}