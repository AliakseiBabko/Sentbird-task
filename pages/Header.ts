import { expect, type Locator, Page } from '@playwright/test'; 

export class Header {
  readonly logo: Locator;
  readonly perfumesButton: Locator;
  readonly colognesButton: Locator;
  readonly beautyLink: Locator;
  readonly shopButton: Locator;
  readonly discoverButton: Locator;
  readonly giftsButton: Locator;
  readonly cartButton: Locator;
  readonly searchButton: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.logo = page.locator('a[aria-label="Scentbird Homepage"]');
    this.perfumesButton = page.getByTestId('perfumes');
    this.colognesButton = page.getByTestId('colognes');
    this.beautyLink = page.getByTestId('beauty');
    this.shopButton = page.getByTestId('shop');
    this.discoverButton = page.getByTestId('discover');
    this.giftsButton = page.getByTestId('gifts');
    this.cartButton = page.getByTestId('cart');
    this.searchButton = page.getByTestId('search');
    this.loginButton = page.getByTestId('loginButton');
  }

  async clickPerfumes() {
    await this.perfumesButton.click();
  }

  async clickColognes() {
    await this.colognesButton.click();
  }

  async clickBeauty() {
    await this.beautyLink.click();
  }

  async clickShop() {
    await this.shopButton.click();
  }

  async clickDiscover() {
    await this.discoverButton.click();
  }

  async clickGifts() {
    await this.giftsButton.click();
  }

  async clickCart() {
    await this.cartButton.click();
  }

  async clickSearch() {
    await this.searchButton.click();
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async verifyLogo() {
    await expect(this.logo).toBeVisible();
  }
}
