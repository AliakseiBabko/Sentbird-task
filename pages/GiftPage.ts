import { expect, type Locator, Page } from '@playwright/test'; 
import { BasePage } from './BasePage';

export class GiftPage extends BasePage {
  readonly breadcrumbsGifts: Locator;
  readonly breadcrumbsGiftSubscription: Locator;
  readonly breadcrumbsCurrent: Locator;
  readonly asideImage: Locator;
  readonly subscriptionForm: Locator;
  readonly scentLabel: Locator;
  readonly cologne: Locator;
  readonly perfume: Locator;
  readonly recipientName: Locator;
  readonly recipientEmail: Locator;
  readonly recipientNameError: Locator;
  readonly recipientEmailError: Locator;
  readonly message: Locator;
  readonly senderName: Locator;
  readonly sendNow: Locator;
  readonly sendLater: Locator;
  readonly payButton: Locator;
  readonly datePicker: Locator;
  readonly dateError: Locator;
  readonly monthSelect: Locator;
  readonly daySelect: Locator;
  readonly yearSelect: Locator;

  constructor(page: Page) {
    super(page);
    this.breadcrumbsGifts = page.getByRole('link', { name: 'Gifts' });
    this.breadcrumbsGiftSubscription = page.getByRole('link', { name: 'Gift subscription' });
    this.breadcrumbsCurrent = page.getByTestId('breadcrumbsCurrent');
    this.asideImage = page.locator('aside img');
    this.subscriptionForm = page.getByTestId('giftSubscriptionForm');
    this.scentLabel = page.getByText('What type of scent does this');
    this.cologne = page.getByTestId('recipientGenderOptionMale');
    this.perfume = page.getByTestId('recipientGenderOptionFemale');
    this.recipientName = page.getByTestId('recipientName');
    this.recipientNameError = page.getByTestId('recipientNameError');
    this.recipientEmail = page.getByTestId('recipientEmail');
    this.recipientEmailError = page.getByTestId('recipientEmailError');
    this.message = page.getByTestId('recipientMessage');
    this.senderName = page.getByTestId('senderName');
    this.sendNow = page.getByTestId('sendDateOptionNow');
    this.sendLater = page.getByTestId('sendDateOptionLater');
    this.payButton = page.getByTestId('checkoutNowButton');
    this.datePicker = page.getByTestId('date');
    this.dateError = page.getByTestId('dateError');
    this.monthSelect = page.getByTestId('dateMonth');
    this.daySelect = page.getByTestId('dateDay');
    this.yearSelect = page.getByTestId('dateYear');
  }

  async navigate() {
    await this.page.goto('/gift?months=6');
    await this.acceptCookies();
  }

  async fillGiftForm(recipientName: string, recipientEmail: string, message?: string, senderName?: string) {
    await this.recipientName.fill(recipientName);
    await this.recipientEmail.fill(recipientEmail);
    await this.message.fill(message || '');
    await this.senderName.fill(senderName || '');
  }

  async selectDate(month: string, day: string) {
    await this.sendLater.click();
    await expect(this.datePicker).toBeVisible();
    await this.monthSelect.selectOption({ value: month });
    await this.daySelect.selectOption({ value: day });
  }

  async clickPayButton() {
    await this.payButton.click();
  }

  async verifyGift() {
    const popUp = this.page.getByTestId('cartModal');
    await expect(popUp).toBeVisible();
    const popUpTitle = popUp.getByTestId('title');
    await expect(popUpTitle).toContainText('Your cart total - $');
    const checkoutButton = popUp.getByTestId('modalPrimaryButton');
    await expect(checkoutButton).toBeVisible();
    await expect(checkoutButton).toHaveText('Checkout');
  }

  async validateFormErrors() {
    const recipientNameError = this.page.getByTestId('recipientNameError');
    const recipientEmailError = this.page.getByTestId('recipientEmailError');
    await expect(recipientNameError).toBeVisible();
    await expect(recipientEmailError).toBeVisible();
  }

  async validateRecipientName(inputValue: string) {
    await this.recipientName.fill(inputValue);
    const currentValue = await this.recipientName.inputValue();
    const isValid = /^[A-Za-z\s]*$/.test(currentValue);
    return isValid;
  }
}
