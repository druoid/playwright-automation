import { Page, expect } from '@playwright/test';

export class TestCasesPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyTestCasesPage() {
    await expect(this.page).toHaveURL("https://automationexercise.com/test_cases"); 
  }
}