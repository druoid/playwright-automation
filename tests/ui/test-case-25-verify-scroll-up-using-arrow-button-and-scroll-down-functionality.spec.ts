import { test } from '@playwright/test';
import { HomePage } from '../../pages/homePage';

test('Verify scroll up using arrow button and scroll down functionality', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await homePage.verifyHomePage();
  await homePage.verifyScrollDownAndUpWithArrow();
});
