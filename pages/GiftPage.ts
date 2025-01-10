import { expect, type Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class GiftPage extends BasePage {
  readonly giftSubscriptionForm: Locator;
  readonly scentLabel: Locator;
  readonly cologneRadio: Locator;
  readonly perfumeRadio: Locator;
  readonly recipientNameInput: Locator;
  readonly recipientEmailInput: Locator;
  readonly messageTextarea: Locator;
  readonly senderNameInput: Locator;
  readonly sendNowRadio: Locator;
  readonly sendLaterRadio: Locator;
  readonly payButton: Locator;
  readonly datePicker: Locator;
  readonly monthSelect: Locator;
  readonly daySelect: Locator;
  readonly yearSelect: Locator;

  constructor(page: Page) {
    super(page);
    this.giftSubscriptionForm = page.getByTestId('giftSubscriptionForm');
    this.scentLabel = page.getByText('What type of scent does this');
    this.cologneRadio = page.getByTestId('recipientGenderOptionMale');
    this.perfumeRadio = page.getByTestId('recipientGenderOptionFemale');
    this.recipientNameInput = page.getByTestId('recipientName');
    this.recipientEmailInput = page.getByTestId('recipientEmail');
    this.messageTextarea = page.getByTestId('recipientMessage');
    this.senderNameInput = page.getByTestId('senderName');
    this.sendNowRadio = page.getByTestId('sendDateOptionNow');
    this.sendLaterRadio = page.getByTestId('sendDateOptionLater');
    this.payButton = page.getByTestId('checkoutNowButton');
    this.datePicker = page.getByTestId('date');
    this.monthSelect = page.getByTestId('dateMonth');
    this.daySelect = page.getByTestId('dateDay');
    this.yearSelect = page.getByTestId('dateYear');
  }

  async navigate() {
    await this.page.goto('/gift?months=6');
    await this.acceptCookies();
  }

  async fillGiftForm({ recipientName, recipientEmail, message, senderName }: { recipientName: string, recipientEmail: string, message: string, senderName: string }) {
    await this.recipientNameInput.fill(recipientName);
    await this.recipientEmailInput.fill(recipientEmail);
    await this.messageTextarea.fill(message);
    await this.senderNameInput.fill(senderName);
  }

  async selectLaterDate(month: string, day: string) {
    await this.sendLaterRadio.click();
    await expect(this.datePicker).toBeVisible();
    await this.monthSelect.selectOption({ value: month });
    await this.daySelect.selectOption({ value: day });
  }

  async clickPayButton() {
    await this.payButton.click();
  }

  async verifyPopUp() {
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

  async validateRecipientNameInput(inputValue: string) {
    await this.recipientNameInput.fill(inputValue);
    const currentValue = await this.recipientNameInput.inputValue();
    const isValid = /^[A-Za-z\s]*$/.test(currentValue);
    return isValid;
  }
}
