import { Page, Locator, expect } from '@playwright/test';
import { environments } from '../config/environments';

type EnvironmentKey = 'dev' | 'test';

const environment: EnvironmentKey = (process.env.TEST_ENV as EnvironmentKey) || 'dev';

const environmentConfig = environments[environment];
const { userPassword } = environmentConfig;

export class LoginPage {
  readonly page: Page;
  readonly signupLoginLink: Locator;
  readonly newUserHeading: Locator;
  readonly nameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;
  readonly loginHeading: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly loginError: Locator;
  readonly emailExistsError: Locator;
  readonly contactUsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupLoginLink = page.getByRole('link', { name: ' Signup / Login' });
    this.newUserHeading = page.getByRole('heading', {
      name: 'New User Signup!',
    });
    this.nameInput = page.getByRole('textbox', { name: 'Name' });
    this.signupEmailInput = page.getByTestId('signup-email');
    this.signupButton = page.getByRole('button', { name: 'Signup' });
    this.loginHeading = page.getByRole('heading', {
      name: 'Login to your account',
    });
    this.loginEmailInput = page.getByTestId('login-email');
    this.loginPasswordInput = page.getByTestId('login-password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.loginError = page.getByText('Your email or password is incorrect!');
    this.emailExistsError = page.getByText('Email Address already exist!');
    this.contactUsLink = page.getByRole('link', { name: 'Contact us' });
  }

  async navigateToLoginPage() {
    await this.signupLoginLink.click();
  }

  async verifyLoginPage() {
    await expect(this.page).toHaveURL('https://automationexercise.com/login');
    await expect(this.loginHeading).toBeVisible();
  }

  async newUserSignUp(user: { firstName: string; lastName: string; email: string }) {
    await expect(this.newUserHeading).toBeVisible();
    await this.nameInput.fill(`${user.firstName} ${user.lastName}`);
    await this.signupEmailInput.fill(user.email);
    await this.signupButton.click();
  }

  async enterLoginCredentials(user: { email: string }) {
    await expect(this.loginHeading).toBeVisible();
    await this.loginEmailInput.fill(user.email);
    await this.loginPasswordInput.fill(userPassword);
    await this.loginButton.click();
  }

  async verifyLoginErrorMessage() {
    await expect(this.loginError).toBeVisible();
  }

  async verifyEmailAlreadyExistsError() {
    await expect(this.emailExistsError).toBeVisible();
  }

  async goToContactUs() {
    await this.contactUsLink.click();
  }
}
