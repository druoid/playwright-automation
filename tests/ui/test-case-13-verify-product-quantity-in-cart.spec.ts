import { test } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { FirstProductDetailPage } from '../../pages/firstProductDetailPage';
import { ProductsPage } from '../../pages/productsPage';
import { CartPage } from '../../pages/cartPage';

test('Verify product quantity in cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const firstProductDetailPage = new FirstProductDetailPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const quantity = 4;

  await homePage.goto();
  await homePage.verifyHomePage();
  await homePage.viewFirstProductInList();

  await firstProductDetailPage.addProductToCart(quantity);

  await productsPage.viewCartModalButton();

  await cartPage.verifyProductQuantitiesInCart(quantity);
  
});