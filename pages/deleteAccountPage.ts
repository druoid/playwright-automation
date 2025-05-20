import { Page } from '@playwright/test';

export class DeleteAccountPage {
  constructor(private page: Page) {}

  async verifyDeletedAccount() {
    await this.page.getByText('Account Deleted!').isVisible();
    await this.page.getByRole('link', { name: 'Continue' }).click();
  }
}
