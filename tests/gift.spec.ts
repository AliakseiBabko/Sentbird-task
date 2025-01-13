import { test, expect } from '@playwright/test';
import { GiftPage } from '../pages/GiftPage';
import * as testData from '../data/testData.json';

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
  const popUp = page.getByTestId('cartModal');
  await expect(popUp.getByTestId('total')).toContainText('Total$');  
  await expect(popUp.getByTestId('modalPrimaryButton')).toHaveText('Checkout');
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