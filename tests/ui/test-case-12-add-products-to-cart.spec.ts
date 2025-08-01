import { test } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { ProductsPage } from '../../pages/productsPage';
import { CartPage } from '../../pages/cartPage';

test('Add products to cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await homePage.goto();
  await homePage.verifyHomePage();
  await homePage.clickProductsLink();

  await productsPage.verifyProductsPage();
  await productsPage.addProductsToCart();
  await productsPage.viewCartModalButton();
  await cartPage.verifyCartContents();

});