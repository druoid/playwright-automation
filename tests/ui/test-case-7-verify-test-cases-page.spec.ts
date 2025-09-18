import { test } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { TestCasesPage } from '../../pages/testCasesPage';

test('Verify test cases page', async ({ page }) => {
  const homePage = new HomePage(page);
  const testCasesPage = new TestCasesPage(page);

  await homePage.goto();
  await homePage.verifyHomePage();
  await homePage.clickTestCasesLink();

  await testCasesPage.verifyTestCasesPage();
});
