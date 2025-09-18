import { test } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { ContactUsPage } from '../../pages/contactUsPage';
import { generateUser } from '../../fixtures/user';

test('Validate contact us form', async ({ page }) => {
  const homePage = new HomePage(page);
  const contactUsPage = new ContactUsPage(page);

  const user = generateUser();

  await homePage.goto();
  await homePage.verifyHomePage();
  await homePage.clickContactUsLink();

  await contactUsPage.verifyOnContactUsPage();
  await contactUsPage.fillContactForm(user);
  await contactUsPage.uploadFile();

  await contactUsPage.submitFormWithDialogConfirmation();

  await contactUsPage.verifySuccessMessage();
  await contactUsPage.goHome();

  await homePage.verifyHomePage();
});
