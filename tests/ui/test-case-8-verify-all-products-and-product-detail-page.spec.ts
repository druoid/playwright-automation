import { test } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { ProductsPage } from '../../pages/productsPage';
import { FirstProductDetailPage } from '../../pages/firstProductDetailPage';

test('Verify all products page and product detail page', async ({ page }) => {
  const homePage = new HomePage(page);
  const productsPage = new ProductsPage(page);
  const firstProductDetailPage = new FirstProductDetailPage(page);

  await homePage.goto();
  await homePage.verifyHomePage();
  await homePage.clickProductsLink();

  await productsPage.verifyProductsPage();
  await productsPage.verifyProductList();

  await firstProductDetailPage.verifyFirstProductPageAndDetail();
});