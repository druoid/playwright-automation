import { test } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { ProductsPage } from '../../pages/productsPage';
import { PopUpAdPage } from '../../pages/popUpAdPage';
import { CartPage } from '../../pages/cartPage';
import { LoginPage } from '../../pages/loginPage';
import { SignUpPage } from '../../pages/signUpPage';
import { generateUser } from '../../fixtures/user';

test('Search products and verify cart after login', async ({ page }) => {
  const homePage = new HomePage(page);
  const productsPage = new ProductsPage(page);
  const popUpAdPage = new PopUpAdPage(page);
  const cartPage = new CartPage(page);
  const loginPage = new LoginPage(page);
  const signUpPage = new SignUpPage(page);
  const user = generateUser();

  await homePage.goto();
  await homePage.clickProductsLink();

  await productsPage.verifyProductsPage();
  await productsPage.searchProduct('Blue top');

  await popUpAdPage.removePopUpAd();

  await productsPage.addSearchedSingleProductToCart();
  await productsPage.viewCartFromModal();

  await cartPage.verifyCartContentsSingleItem();

  await loginPage.navigateToLoginPage();
  await loginPage.newUserSignUp(user);

  await signUpPage.enterAccountInformation(user);

  await cartPage.navigateToCartFromMainNavigation();

  await cartPage.verifyCartContentsSingleItem();
});
