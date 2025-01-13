import { test, expect } from '@playwright/test';
import { GiftPage } from '../pages/GiftPage';

test.beforeEach(async ({ page }) => {
  const giftPage = new GiftPage(page);
  await giftPage.navigate();
});

test('Verify valid gift subscription order up to checkout pop-up', async ({ page }) => {
  const giftPage = new GiftPage(page);

  // Fill out the gift form with valid data
  await giftPage.fillGiftForm('Alice Smith', 'alice.smith@example.com', 'Happy Birthday, enjoy the gift!', 'Bob Johnson');

  // Click the "Pay for your order" button
  await giftPage.clickPayButton();

 // Verify that the cart pop-up contains correct information
  await giftPage.verifyGift();
});

test('Form Submission with Optional Fields Left Blank', async ({ page }) => {
  const giftPage = new GiftPage(page);

  // Fill out the form with required fields and leave optional fields blank
  await giftPage.fillGiftForm('John Doe', 'john.doe@example.com');

  // Click the "Pay for your order" button
  await giftPage.clickPayButton();

  // Verify that the cart pop-up contains the correct information
  await giftPage.verifyGift();
});

test('Switch Scent to Perfume and Order Immediately', async ({ page }) => {
  const giftPage = new GiftPage(page);

  // Switch scent preference to "Perfume"
  await giftPage.perfume.click();

  // Fill out the gift form with valid data
  await giftPage.fillGiftForm('Alice Smith', 'alice.smith@example.com', 'Happy Birthday, enjoy the gift!', 'Bob Johnson');

  // Click the "Pay for your order" button
  await giftPage.clickPayButton();

  // Verify that the cart pop-up contains the correct information
  await giftPage.verifyGift();
});

test('Verify past date selection triggers error', async ({ page }) => {
  const giftPage = new GiftPage(page);

  // Fill the required fields with valid data
  await giftPage.fillGiftForm('Alice Smith', 'alice.smith@example.com');

  // Select a past date (e.g., January 1st, 2024)
  await giftPage.selectDate('1', '1');

  // Verify that the selected date is shown in the date picker
  await expect(giftPage.monthSelect).toHaveValue('1');
  await expect(giftPage.daySelect).toHaveValue('1');
  await expect(giftPage.yearSelect).toHaveValue('2025');

  // Click the "Pay for your order" button
  await giftPage.clickPayButton();

  // Verify that the error message "Date must be in the future" is shown
  const errorMessage = await giftPage.dateError.textContent();
  expect(errorMessage).toBe('Date must be in the future');
});

test('Verify that required fields are highlighted when the form is submitted empty', async ({ page }) => {
  const giftPage = new GiftPage(page);

  // Click the 'Pay for your order' button without filling in the required fields
  await giftPage.clickPayButton();

  // Check that the required fields are highlighted
  await expect(giftPage.recipientName).toHaveAttribute('aria-invalid', 'true');
  await expect(giftPage.recipientEmail).toHaveAttribute('aria-invalid', 'true');

  // Verify that no confirmation pop-up appears
  const confirmationPopup = page.locator('.confirmation-popup');
  await expect(confirmationPopup).toHaveCount(0);
});
