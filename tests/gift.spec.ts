import { test, expect } from '@playwright/test';
import { GiftPage } from '../pages/GiftPage';
import * as testData from '../data/testData.json';

test.beforeEach(async ({ page }) => {
  const giftPage = new GiftPage(page);
  await giftPage.navigate();
});

test('The page loads correctly', async ({ page }) => {
  const giftPage = new GiftPage(page);

  await expect(giftPage.giftSubscriptionForm).toBeVisible();
  await expect(giftPage.scentLabel).toBeVisible();
  await expect(giftPage.cologneRadio).toBeVisible();
  await expect(giftPage.perfumeRadio).toBeVisible();
  await expect(giftPage.recipientNameInput).toBeVisible();
  await expect(giftPage.recipientEmailInput).toBeVisible();
  await expect(giftPage.messageTextarea).toBeVisible();
  await expect(giftPage.senderNameInput).toBeVisible();
  await expect(giftPage.sendNowRadio).toBeVisible();
  await expect(giftPage.sendLaterRadio).toBeVisible();
  await expect(giftPage.payButton).toBeVisible();
});

test('Verify the "Choose a later date to send" date selection', async ({ page }) => {
  const giftPage = new GiftPage(page);

  await giftPage.selectLaterDate('6', '3');
  await expect(giftPage.monthSelect).toHaveValue('6');
  await expect(giftPage.daySelect).toHaveValue('3');
});

test('Verify form submission and Checkout pop-up', async ({ page }) => {
  const giftPage = new GiftPage(page);

  // Use valid data from testData.json
  await giftPage.fillGiftForm(testData.validGiftData);

  await giftPage.selectLaterDate('6', '3');
  await giftPage.clickPayButton();
  await giftPage.verifyPopUp();
});

test('Submit an empty form', async ({ page }) => {
  const giftPage = new GiftPage(page);

  await giftPage.clickPayButton();
  await giftPage.validateFormErrors();
});

test('Recipient\'s name field allows entering only Latin letters', async ({ page }) => {
  const giftPage = new GiftPage(page);

  // Use invalid inputs from testData.json
  for (const input of testData.invalidInputs) {
    const isValid = await giftPage.validateRecipientNameInput(input);
    expect(isValid, `Input value '${input}' should only allow Latin letters`).toBe(true);
  }

  const validInput = 'John Doe';
  const isValid = await giftPage.validateRecipientNameInput(validInput);
  expect(isValid, `Valid input '${validInput}' should be accepted`).toBe(true);
});