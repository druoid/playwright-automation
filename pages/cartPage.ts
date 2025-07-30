import { Page, Locator, expect } from '@playwright/test';
import { user } from '../fixtures/user';

export class CartPage {
  readonly page: Page;
  readonly subscriptionText: Locator;
  readonly subscriptionInput: Locator;
  readonly subscriptionButton: Locator;
  readonly subscriptionSuccessMessage: Locator; 

  constructor(page: Page) {
    this.page = page;
    this.subscriptionText = page.locator('#footer');
    this.subscriptionInput = page.getByRole('textbox', { name: 'Your email address' });
    this.subscriptionButton = page.getByRole('button', { name: '' });
    this.subscriptionSuccessMessage = page.getByText('You have been successfully subscribed!');
  }

  async verifyAddSubscriptionSuccessFromCartPage() {
    await expect(this.subscriptionText).toContainText('Subscription');
    await this.subscriptionInput.fill(user.email);
    await this.subscriptionButton.click();
    await expect(this.subscriptionSuccessMessage).toBeVisible();
  }   
}
