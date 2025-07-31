import { test } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { generateUser } from '../../fixtures/user';
import { ProductsPage } from '../../pages/productsPage';
import { CartPage } from '../../pages/cartPage';
import { LoginPage } from '../../pages/loginPage';
import { AccountCreatedPage } from '../../pages/accountCreatedPage';  
import { SignUpPage } from '../../pages/signUpPage';
import { LoggedInHomePage } from '../../pages/loggedInHomePage';
import { CheckoutPage } from '../../pages/checkoutPage';  
import { PaymentPage } from '../../pages/paymentPage';    


test('Place order and register at checkout', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const accountCreatedPage = new AccountCreatedPage(page);
  const signUpPage = new SignUpPage(page);
  const user = generateUser();
  const loggedInHomePage = new LoggedInHomePage(page, user);
  const checkoutPage = new CheckoutPage(page, user);
  const paymentPage = new PaymentPage(page);

  await homePage.goto();

  await homePage.verifyHomePage();

  await productsPage.addProductsToCart();
  await productsPage.viewCartModal(); 

  await cartPage.verifyCartPage();
  await cartPage.proceedToCheckout();
  await cartPage.openRegisterLoginFromCartModal(); 
  
  await loginPage.newUserSignUp(user);
  
  await signUpPage.enterAccountInformation(user);

  await accountCreatedPage.verifyAccountCreation();
  await accountCreatedPage.continue();

  await loggedInHomePage.verifyUserIsLoggedIn();
  
  await homePage.clickCartPageLink();

  await cartPage.proceedToCheckout();

  await checkoutPage.validateAddresses();

  await cartPage.verifyCartContents();

  await checkoutPage.verifyCartTotalPrice(await cartPage.calculateTotalPrice());
  
  await checkoutPage.fillOrderComment();
  await checkoutPage.placeOrder();

  await paymentPage.fillPaymentDetailsAndSubmitPayment(user.firstName, user.lastName);
  await paymentPage.verifyOrderSuccess();
  await paymentPage.deleteAccountAndContinue();  
});