import { test } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { ProductsPage } from '../../pages/productsPage';
import { CartPage } from '../../pages/cartPage';
import { PopUpAdPage } from '../../pages/popUpAdPage';

test('Add products to cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const popUpAdPage = new PopUpAdPage(page);

  await homePage.goto();
  await homePage.verifyHomePage();
  await homePage.clickProductsLink();

  await productsPage.verifyProductsPage();
  await popUpAdPage.removePopUpAd();
  await productsPage.addProductsToCart();
  await productsPage.viewCartFromModal();

  await cartPage.verifyCartPage();
  await cartPage.verifyCartContents();
});
