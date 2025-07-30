import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly productList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productList = page.locator('.single-products').first(); // Assuming the first element is representative of the product list
  }

  async verifyProductsPage() {
    await expect(this.page).toHaveURL("https://automationexercise.com/products");
  }

  async verifyProductList() {
    await expect(this.productList).toBeVisible();
  }
}