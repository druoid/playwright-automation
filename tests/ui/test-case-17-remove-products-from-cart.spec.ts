import { test } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { FirstProductDetailPage } from '../../pages/firstProductDetailPage';
import { ProductsPage } from '../../pages/productsPage';
import { CartPage } from '../../pages/cartPage';

test('Remove products from cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const firstProductDetailPage = new FirstProductDetailPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const quantity = 1;

  await homePage.goto();
  await homePage.verifyHomePage();
  await homePage.viewFirstProductInList();

  await firstProductDetailPage.addProductToCart(quantity);

  await productsPage.viewCartFromModal();

  await cartPage.verifyCartPage();

  await cartPage.deleteProductFromCart();
  await cartPage.verifyCartIsEmpty();
});
