import { Page, Locator, expect } from '@playwright/test';

export class DeleteAccountPage {
  readonly page: Page;
  readonly confirmationMessage: Locator;
  readonly continueLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.confirmationMessage = page.getByText('Account Deleted!');
    this.continueLink = page.getByRole('link', { name: 'Continue' });
  }

  async verifyAccountDeleted() {
    await expect(this.confirmationMessage).toBeVisible();
  }

  async continue() {
    await this.continueLink.click();
  }
}
