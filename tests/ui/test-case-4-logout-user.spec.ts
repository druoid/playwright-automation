 import { test } from '@playwright/test';
 import { HomePage } from '../../pages/homePage';
 import { LoginPage } from '../../pages/loginPage';
 import { SignUpPage } from '../../pages/signUpPage';
 import { AccountCreatedPage } from '../../pages/accountCreatedPage';
 import { LoggedInHomePage } from '../../pages/loggedInHomePage';
 
 test('Logout user', async ({ page }) => {
   const homePage = new HomePage(page);
   const loginPage = new LoginPage(page);
   const signUpPage = new SignUpPage(page);
   const accountCreatedPage = new AccountCreatedPage(page);
   const loggedInHomePage = new LoggedInHomePage(page);
 
   await homePage.goto();
   await homePage.verifyHomePage();
 
   await loginPage.navigateToLoginPage();
   await loginPage.newUserSignUp();
 
   await signUpPage.enterAccountInformation();
 
   await accountCreatedPage.verifyAccountCreation();
 
   await loggedInHomePage.verifyLoggedInUser();
   await loggedInHomePage.logOutOfAccount();
 
   await loginPage.navigateToLoginPage();
   await loginPage.enterLoginCredentials();
   
   await loggedInHomePage.verifyLoggedInUser();
   await loggedInHomePage.logOutOfAccount();

   await loginPage.verifyLoginPage();
 });