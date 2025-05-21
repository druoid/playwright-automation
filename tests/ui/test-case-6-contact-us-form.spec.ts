import { test } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { ContactUsPage } from '../../pages/contactUsPage';

test('Validate contact us form', async ({ page }) => {
  const homePage = new HomePage(page);
  const contactUsPage = new ContactUsPage(page);

  await homePage.goto();
  await homePage.verifyHomePage();
  await homePage.clickOnContactUs();

  await contactUsPage.verifyContactUsPage();
  await contactUsPage.fillContactUsForm();
  await contactUsPage.uploadFile();
 
  await contactUsPage.clickOnOkButtonListenerAndThenSubmitButton(); 

  await contactUsPage.verifySuccessMessage();
  await contactUsPage.clickOnHomeButton();

  await homePage.verifyHomePage();
});