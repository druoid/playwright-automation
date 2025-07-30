import { test } from '@playwright/test';
import { HomePage } from '../../pages/homePage';

test('Verify add subscription on home page', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await homePage.verifyHomePage();
  await homePage.verifyAddSubscriptionSuccess();
});