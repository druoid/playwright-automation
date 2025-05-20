import { Page } from '@playwright/test';
import { user } from '../fixtures/user';

export class LoggedInHomePage {
  constructor(private page: Page) {}

  async verifyLoggedInUser() {
    await this.page
      .getByText('Logged in as ' + user.firstName + '' + user.lastName)
      .isVisible();
  }

  async deleteAccount() {
    await this.page.getByRole('link', { name: ' Delete Account' }).click();
  }
}
