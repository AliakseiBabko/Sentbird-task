import { type Locator, Page } from '@playwright/test';

export class Footer {
  readonly perfumes: Locator;
  readonly colognes: Locator;
  readonly beauty: Locator;
  readonly perfumeSubscription: Locator;
  readonly cologneSubscription: Locator;
  readonly driftCarScents: Locator;
  readonly rebelConfessions: Locator;
  readonly scentEdit: Locator;
  readonly scentbirdCases: Locator;
  readonly fullSizeFragrances: Locator;
  readonly bathAndBody: Locator;
  readonly candlesHomeScents: Locator;
  readonly gifts: Locator;
  readonly scentProfile: Locator;
  readonly scentbirdSelect: Locator;
  readonly allBrands: Locator;
  readonly scentHoroscope: Locator;
  readonly featuredBrand: Locator;
  readonly notesLibrary: Locator;
  readonly fragranceFamilies: Locator;
  readonly scentBlog: Locator;
  readonly scentWorldPodcast: Locator;
  readonly helpAndSupport: Locator;
  readonly aboutUs: Locator;
  readonly careers: Locator;
  readonly press: Locator;
  readonly privacyPolicy: Locator;
  readonly dontSellMyInfo: Locator;
  readonly termsConditions: Locator;
  readonly accessibility: Locator;
  readonly cookiesButton: Locator;
  readonly instagramIcon: Locator;
  readonly facebookIcon: Locator;
  readonly twitterIcon: Locator;
  readonly pinterestIcon: Locator;
  readonly tiktokIcon: Locator;
  readonly googlePlay: Locator;
  readonly appStore: Locator;

  constructor(page: Page) {

    // Subscription Links
    this.perfumes = page.getByTestId('footer-mySubscription-perfumes');
    this.colognes = page.getByTestId('footer-mySubscription-colognes');
    this.beauty = page.getByTestId('footer-mySubscription-beauty');
    this.perfumeSubscription = page.getByTestId('footer-perfume-subscription');
    this.cologneSubscription = page.getByTestId('footer-cologne-subscription');

    // Shop Links
    this.driftCarScents = page.getByTestId('footer-shop-drift-ecommerce-promo');
    this.rebelConfessions = page.getByTestId('header-shop-coar');
    this.scentEdit = page.getByTestId('footer-shop-edit');
    this.scentbirdCases = page.getByTestId('footer-shop-scentbirdCases');
    this.fullSizeFragrances = page.getByTestId('footer-shop-fullSizeFragrances');
    this.bathAndBody = page.getByTestId('footer-shop-bathBody');
    this.candlesHomeScents = page.getByTestId('footer-shop-candlesHomeScents');
    this.gifts = page.getByTestId('footer-shop-gifts');

    // Discover Links
    this.scentProfile = page.getByTestId('footer-discover-scentProfile');
    this.scentbirdSelect = page.getByTestId('footer-discover-scentbird-select');
    this.allBrands = page.getByTestId('footer-discover-allBrands');
    this.scentHoroscope = page.getByTestId('footer-discover-scentHoroscope');
    this.featuredBrand = page.getByTestId('footer-discover-featuredBrand');
    this.notesLibrary = page.getByTestId('footer-discover-notesLibrary');
    this.fragranceFamilies = page.getByTestId('footer-discover-fragranceFamilies');
    this.scentBlog = page.getByTestId('footer-discover-scentBlog');
    this.scentWorldPodcast = page.getByTestId('footer-discover-podcast');

    // About Scentbird Links
    this.helpAndSupport = page.getByTestId('footer-about-scentbird-support');
    this.aboutUs = page.getByTestId('footer-about-scentbird-aboutUs');
    this.careers = page.getByTestId('footer-about-scentbird-careers');
    this.press = page.getByTestId('footer-about-scentbird-press');

    // Policy and Legal Links
    this.privacyPolicy = page.getByText('Privacy Policy');
    this.dontSellMyInfo = page.getByText('Don’t sell my info');
    this.termsConditions = page.getByText('Terms & Conditions');
    this.accessibility = page.getByText('Accessibility');
    this.cookiesButton = page.locator('button:has-text("Cookies")');

    // Social Media Icons
    this.instagramIcon = page.locator('a[title="Instagram"]');
    this.facebookIcon = page.locator('a[title="Facebook"]');
    this.twitterIcon = page.locator('a[title="Twitter"]');
    this.pinterestIcon = page.locator('a[title="Pinterest"]');
    this.tiktokIcon = page.locator('a[title="TikTok"]');

    // Store Links
    this.googlePlay = page.locator('a[title="Get in Google Play"]');
    this.appStore = page.locator('a[title="Get in App Store"]');
  }

  // Click actions for each link/button
  async clickPerfumes() {
    await this.perfumes.click();
  }

  async clickColognes() {
    await this.colognes.click();
  }

  async clickBeauty() {
    await this.beauty.click();
  }

  async clickPerfumeSubscription() {
    await this.perfumeSubscription.click();
  }

  async clickCologneSubscription() {
    await this.cologneSubscription.click();
  }

  async clickGifts() {
    await this.gifts.click();
  }

  // Social media click actions
  async clickInstagram() {
    await this.instagramIcon.click();
  }

  async clickFacebook() {
    await this.facebookIcon.click();
  }

  async clickTwitter() {
    await this.twitterIcon.click();
  }

  async clickPinterest() {
    await this.pinterestIcon.click();
  }

  async clickTikTok() {
    await this.tiktokIcon.click();
  }

  // Privacy and Legal
  async clickPrivacyPolicy() {
    await this.privacyPolicy.click();
  }

  async clickTermsConditions() {
    await this.termsConditions.click();
  }

  async clickAccessibility() {
    await this.accessibility.click();
  }

  async clickCookies() {
    await this.cookiesButton.click();
  }
}
