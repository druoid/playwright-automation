import { test } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { generateUser } from '../../fixtures/user';

test('Verify add subscription on home page', async ({ page }) => {
  const homePage = new HomePage(page);

  const user = generateUser();

  await homePage.goto();
  await homePage.verifyHomePage();
  await homePage.verifyAddSubscriptionSuccessFromHomePage(user);
});
