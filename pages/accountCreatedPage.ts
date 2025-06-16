import { Page, Locator, expect } from '@playwright/test';

export class AccountCreatedPage {
  readonly page: Page;
  readonly successMessage: Locator;
  readonly continueButton: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.successMessage = page.getByText('Account Created!');
    this.continueButton = page.getByRole('link', { name: 'Continue' });
  }

  async verifyAccountCreation() {
    await expect(this.successMessage).toBeVisible();
  }

  async continue() {
    await this.continueButton.click();  
  }
}
