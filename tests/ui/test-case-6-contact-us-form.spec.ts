import { test } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { ContactUsPage } from '../../pages/contactUsPage';

test('Validate contact us form', async ({ page }) => {
  const homePage = new HomePage(page);
  const contactUsPage = new ContactUsPage(page);

  await homePage.goto();
  await homePage.verifyHomePage();
  await homePage.clickContactUs();

  await contactUsPage.verifyOnContactUsPage();
  await contactUsPage.fillContactForm();
  await contactUsPage.uploadFile();
 
  await contactUsPage.submitFormWithDialogConfirmation(); 

  await contactUsPage.verifySuccessMessage();
  await contactUsPage.goHome();

  await homePage.verifyHomePage();
});