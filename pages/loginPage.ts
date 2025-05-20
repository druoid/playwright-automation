import { Page, expect } from '@playwright/test';
import { user } from '../fixtures/user';

export class LoginPage {
  constructor(private page: Page) {}

  async navigateToLoginPage() {
    await this.page.getByRole('link', { name: ' Signup / Login' }).click();
  }

  async newUserSignUp() {
    await this.page
      .getByRole('heading', { name: 'New User Signup!' })
      .isVisible();
    await this.page
      .getByRole('textbox', { name: 'Name' })
      .fill(user.firstName + ' ' + user.lastName);
    await this.page.getByTestId('signup-email').fill(user.email);
    await this.page.getByRole('button', { name: 'Signup' }).click();
  }

  async enterLoginCredentials() {
    await this.page
      .getByRole('heading', { name: 'Login to your account' })
      .isVisible();
    await this.page.getByTestId('login-email').fill(user.email);
    await this.page.getByTestId('login-password').fill(user.password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async verifyLoginErrorMessage() {
    await this.page
      .getByText('Your email or password is incorrect!')
      .isVisible();
  }

  async verifyLoginPage() {
    await expect(this.page).toHaveURL('https://automationexercise.com/login');
    await this.page
      .getByRole('heading', { name: 'Login to your account' })
      .isVisible();
  }

  async verifyEmailAlreadyExistsError() {
    await this.page.getByText('Email Address already exist!').isVisible();
  }
}
