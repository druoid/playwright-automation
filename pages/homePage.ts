import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async verifyHomePage() {
    await expect(this.page).toHaveURL('https://automationexercise.com/');
    const heading = this.page.getByRole('heading', {
      name: 'AutomationExercise',
    });
    await expect(heading).toBeVisible();
  }
}
