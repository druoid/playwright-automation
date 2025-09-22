import { Page, Locator, expect } from '@playwright/test';

export class ProductDetailPage {
  readonly page: Page;
  readonly yourNameTextBox: Locator;
  readonly emailAddress: Locator;
  readonly reviewTextBox: Locator;
  readonly submitButton: Locator;
  readonly reviewSuccessMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.yourNameTextBox = page.getByRole('textbox', { name: 'Your Name' });
    this.emailAddress = page.getByRole('textbox', { name: 'Email Address', exact: true });
    this.reviewTextBox = page.getByRole('textbox', { name: 'Add Review Here!' });
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.reviewSuccessMessage = page.locator('.alert-success.alert span');

  }

  async leaveReviewAndSubmitWithSuccessMessage(user: { firstName: string,  email: string } ) {
    this.yourNameTextBox.fill(user.firstName);
    this.emailAddress.fill(user.email);
    this.reviewTextBox.fill('Fake review');
    await expect(this.reviewSuccessMessage).toHaveText('Thank you for your review.');
  }
}