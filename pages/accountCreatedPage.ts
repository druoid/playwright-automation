import { Page } from '@playwright/test';

export class AccountCreatedPage {
  constructor(private page: Page) {}

  async verifyAccountCreation() {
    await this.page.getByText('Account Created!').isVisible();
    await this.page.getByRole('link', { name: 'Continue' }).click();
  }
}
