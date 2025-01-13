import { expect } from '@playwright/test';
import { Header } from '../page-component/Header';
import { Footer } from '../page-component/Footer';
import { CookiesConsent } from '../page-component/CookiesConsent';
import { BasePage } from '../../core-framework/BasePage';
import { step } from '../../core-framework/helper/log';

export class GiftPage extends BasePage {
  readonly header = new Header(this.page);
  readonly footer = new Footer(this.page);
  readonly cookiesConsent = new CookiesConsent(this.page);

  readonly breadcrumbsGifts = this.page.getByRole('link');
  readonly breadcrumbsGiftSubscription = this.page.getByRole('link');
  readonly breadcrumbsCurrent = this.page.getByTestId('breadcrumbsCurrent');
  readonly asideImage = this.page.locator('aside img');
  readonly subscriptionForm = this.page.getByTestId('giftSubscriptionForm');
  readonly scentLabel = this.page.getByText('What type of scent does this');
  readonly cologne = this.page.getByTestId('recipientGenderOptionMale');
  readonly perfume = this.page.getByTestId('recipientGenderOptionFemale');
  readonly recipientName = this.page.getByTestId('recipientName');
  readonly recipientNameError = this.page.getByTestId('recipientNameError');
  readonly recipientEmail = this.page.getByTestId('recipientEmail');
  readonly recipientEmailError = this.page.getByTestId('recipientEmailError');
  readonly message = this.page.getByTestId('recipientMessage');
  readonly senderName = this.page.getByTestId('senderName');
  readonly sendNow = this.page.getByTestId('sendDateOptionNow');
  readonly sendLater = this.page.getByTestId('sendDateOptionLater');
  readonly payButton = this.page.getByTestId('checkoutNowButton');
  readonly datePicker = this.page.getByTestId('date');
  readonly dateError = this.page.getByTestId('dateError');
  readonly monthSelect = this.page.getByTestId('dateMonth');
  readonly daySelect = this.page.getByTestId('dateDay');
  readonly yearSelect = this.page.getByTestId('dateYear');

  async navigate() {
    await this.page.goto('/gift?months=6');
    await this.acceptCookies();
  }

  @step
  async fillGiftForm(recipientName: string, recipientEmail: string, message?: string, senderName?: string) {
    await this.recipientName.fill(recipientName);
    await this.recipientEmail.fill(recipientEmail);
    await this.message.fill(message || '');
    await this.senderName.fill(senderName || '');
  }

  @step
  async selectDate(month: string, day: string) {
    await this.sendLater.click();
    await expect(this.datePicker).toBeVisible();
    await this.monthSelect.selectOption({ value: month });
    await this.daySelect.selectOption({ value: day });
  }

  @step
  async clickPayButton() {
    await this.payButton.click();
  }

  @step
  async verifyGift() {
    const popUp = this.page.getByTestId('cartModal');
    await expect(popUp).toBeVisible();
    const popUpTitle = popUp.getByTestId('title');
    await expect(popUpTitle).toContainText('Your cart total - $');
    const checkoutButton = popUp.getByTestId('modalPrimaryButton');
    await expect(checkoutButton).toBeVisible();
    await expect(checkoutButton).toHaveText('Checkout');
  }

  @step
  async validateFormErrors() {
    const recipientNameError = this.page.getByTestId('recipientNameError');
    const recipientEmailError = this.page.getByTestId('recipientEmailError');
    await expect(recipientNameError).toBeVisible();
    await expect(recipientEmailError).toBeVisible();
  }

  @step
  async validateRecipientName(inputValue: string) {
    await this.recipientName.fill(inputValue);
    const currentValue = await this.recipientName.inputValue();
    const isValid = /^[A-Za-z\s]*$/.test(currentValue);
    return isValid;
  }
}
