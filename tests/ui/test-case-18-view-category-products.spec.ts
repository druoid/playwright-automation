import { test } from '@playwright/test';
import { HomePage } from '../../pages/homePage';

test('View category products', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();

  await homePage.verifyWomenCategory();
  await homePage.verifyMenCategory();

  await homePage.clickWomenCategory();
  await homePage.clickWomanDressCategory();
  await homePage.verifyWomanDressCategoryProductSectionHeader();    

  await homePage.clickMenCategory();
  await homePage.clickMenTShirtCategory();
  await homePage.verifyMenTShirtCategoryProductSectionHeader();
});