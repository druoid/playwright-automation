import { test } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { CartPage } from '../../pages/cartPage';
import { ProductsPage } from '../../pages/productsPage';

test('Add to cart from recommended items', async ({ page }) => {
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);
  const productsPage = new ProductsPage(page);
 
  await homePage.goto();
  await homePage.clickOnFirstItemInRecommendedItems();

  await productsPage.viewCartFromModal();
  await cartPage.verifyCartContentsSingleItem();
});
