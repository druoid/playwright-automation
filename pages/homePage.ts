import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://automationexercise.com/');
  }

  async verifyHomePage() {
    expect(this.page).toHaveURL('https://automationexercise.com/');
    const heading = this.page.getByRole('heading', {
      name: 'AutomationExercise',
    });
    expect(heading).toBeVisible();
  }
}
