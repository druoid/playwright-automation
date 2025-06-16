import { Page, Locator, expect } from '@playwright/test';
import { user } from '../fixtures/user';

export class LoggedInHomePage {
  readonly page: Page;
  readonly loggedInText: Locator;
  readonly deleteAccountLink: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loggedInText = page.getByText(`Logged in as ${user.firstName} ${user.lastName}`);
    this.deleteAccountLink = page.getByRole('link', { name: ' Delete Account' });
    this.logoutLink = page.getByRole('link', { name: ' Logout' });
  }

  async verifyUserIsLoggedIn() {
    await expect(this.loggedInText).toBeVisible();
  }

  async deleteAccount() {
    await this.deleteAccountLink.click();
  }

  async logOut() {
    await this.logoutLink.click();
  }
}

