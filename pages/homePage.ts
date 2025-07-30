import { Page, Locator, expect } from '@playwright/test';
import { user } from '../fixtures/user';

export class HomePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly contactUsLink: Locator;
  readonly testCasesLink: Locator;
  readonly productsLink: Locator;
  readonly subscriptionText: Locator;
  readonly subscriptionInput: Locator;
  readonly subscriptionButton: Locator;
  readonly subscriptionSuccessMessage: Locator; 

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'AutomationExercise' });
    this.contactUsLink = page.getByRole('link', { name: 'Contact us' });
    this.testCasesLink = page.getByRole('link', { name: ' Test Cases' });
    this.productsLink = page.getByRole('link', { name: ' Products' });
    this.subscriptionText = page.locator('#footer');
    this.subscriptionInput = page.getByRole('textbox', { name: 'Your email address' });
    this.subscriptionButton = page.getByRole('button', { name: '' });
    this.subscriptionSuccessMessage = page.getByText('You have been successfully subscribed!');
  }

  async goto() {
    await this.page.goto('/'); // uses baseURL from config
  }

  async verifyHomePage() {
    await expect(this.page).toHaveURL('https://automationexercise.com'); 
    await expect(this.heading).toBeVisible();
  }

  async clickContactUsLink() {
    await this.contactUsLink.click();
  }

  async clickTestCasesLink() {
    await this.testCasesLink.click();
  }

  async clickProductsLink() {
    await this.productsLink.click();
  }

  async verifyAddSubscriptionSuccess() {
    await expect(this.subscriptionText).toContainText('Subscription');
    await this.subscriptionInput.fill(user.email);
    await this.subscriptionButton.click();
    await expect(this.subscriptionSuccessMessage).toBeVisible();
  }   
}
