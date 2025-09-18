import { test } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { ProductsPage } from '../../pages/productsPage';

test('View brand products', async ({ page }) => {
  const homePage = new HomePage(page);
  const productsPage = new ProductsPage(page);

  await homePage.goto();
  await homePage.clickProductsLink();

  await productsPage.verifyBrandsSection();

  await productsPage.viewBrandProducts();
});
