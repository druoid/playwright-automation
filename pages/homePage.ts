import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly contactUsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'AutomationExercise' });
    this.contactUsLink = page.getByRole('link', { name: 'Contact us' });
  }

  async goto() {
    await this.page.goto('/'); // uses baseURL from config
  }

  async verifyHomePage() {
    await expect(this.page).toHaveURL(/.*automationexercise\.com/); // regex for flexibility
    await expect(this.heading).toBeVisible();
  }

  async clickContactUs() {
    await this.contactUsLink.click();
  }
}
