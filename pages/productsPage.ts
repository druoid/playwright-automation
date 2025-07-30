import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly productList: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchedProductsHeading: Locator;
  readonly searchResults: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productList = page.locator('.single-products').first(); // Assuming the first element is representative of the product list
    this.searchInput = page.getByRole('textbox', { name: 'Search Product' });
    this.searchButton = page.getByRole('button', { name: '' });
    this.searchedProductsHeading = page.getByRole('heading', { name: 'Searched Products' });

  }

  async verifyProductsPage() {
    await expect(this.page).toHaveURL("https://automationexercise.com/products");
  }

  async verifyProductList() {
    await expect(this.productList).toBeVisible();
  }

  async searchProduct(productName: string) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
    await expect(this.searchedProductsHeading).toBeVisible();
   
    const matchingProduct = this.productList.filter({ hasText: productName });
    await expect(matchingProduct.first()).toBeVisible();
  }
}