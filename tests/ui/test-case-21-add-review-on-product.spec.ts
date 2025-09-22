import { test } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { ProductsPage } from '../../pages/productsPage';
import { ProductDetailPage } from '../../pages/productDetailPage';
import { generateUser } from '../../fixtures/user';

test('Add review on product', async ({ page }) => {
  const homePage = new HomePage(page);
  const productsPage = new ProductsPage(page);
  const productDetailPage= new ProductDetailPage(page);
  const user = generateUser();

  await homePage.goto();
  await homePage.clickProductsLink();

  await productsPage.verifyProductsPage();
  await productsPage.viewFirstProduct();

  await productDetailPage.leaveReviewAndSubmitWithSuccessMessage(user);



});
