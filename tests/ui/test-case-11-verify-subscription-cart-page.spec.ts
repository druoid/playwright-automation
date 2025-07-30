import { test } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { CartPage } from '../../pages/cartPage';

test('Verify add subscription on cart page', async ({ page }) => {
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);

  await homePage.goto();
  await homePage.verifyHomePage();
  
  await homePage.clickCartPageLink();
  await cartPage.verifyAddSubscriptionSuccessFromCartPage();
});