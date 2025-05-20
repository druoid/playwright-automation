import { Page } from '@playwright/test';
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
}
