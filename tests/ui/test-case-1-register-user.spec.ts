import { test } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { LoginPage } from '../../pages/loginPage';
import { SignUpPage } from '../../pages/signUpPage';
import { AccountCreatedPage } from '../../pages/accountCreatedPage';
import { LoggedInHomePage } from '../../pages/loggedInHomePage';
import { DeleteAccountPage } from '../../pages/deleteAccountPage';
import { generateUser } from '../../fixtures/user';

test('Register user', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const signUpPage = new SignUpPage(page);
  const accountCreatedPage = new AccountCreatedPage(page);
  const user = generateUser();
  const loggedInHomePage = new LoggedInHomePage(page, user);
  const deleteAccountPage = new DeleteAccountPage(page);


  await homePage.goto();
  await homePage.verifyHomePage();

  await loginPage.navigateToLoginPage();
  await loginPage.newUserSignUp(user);

  await signUpPage.enterAccountInformation(user);

  await accountCreatedPage.verifyAccountCreation();
  await accountCreatedPage.continue();

  await loggedInHomePage.verifyUserIsLoggedIn();
  await loggedInHomePage.deleteAccount();

  await deleteAccountPage.verifyAccountDeleted();
});
