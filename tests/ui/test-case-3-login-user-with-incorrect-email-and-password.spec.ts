import { test } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { LoginPage } from '../../pages/loginPage';
import { generateUser } from '../../fixtures/user';

test('Login user with incorrect email and password', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  const user = generateUser();

  await homePage.goto();
  await homePage.verifyHomePage();

  await loginPage.navigateToLoginPage();
  await loginPage.enterLoginCredentials(user);
  await loginPage.verifyLoginErrorMessage();
});
