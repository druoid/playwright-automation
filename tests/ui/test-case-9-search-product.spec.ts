import { test } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { ProductsPage } from '../../pages/productsPage';

test('Verify search product functionality', async ({ page }) => {
  const homePage = new HomePage(page);
  const productsPage = new ProductsPage(page);

  await homePage.goto();
  await homePage.verifyHomePage();
  await homePage.clickProductsLink();

  await productsPage.verifyProductsPage();
  await productsPage.searchProduct('Blue Top'); // Example product name to search
});
