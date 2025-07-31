import { test } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { ProductsPage } from '../../pages/productsPage';

test('Add products to cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const productsPage = new ProductsPage(page);

  await homePage.goto();
  await homePage.verifyHomePage();
  await homePage.clickProductsLink();

  await productsPage.verifyProductsPage();
  await productsPage.addProductsToCart();
  await productsPage.viewCart();
  await productsPage.verifyCartContents();
  
});