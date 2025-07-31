import { Page, Locator, expect } from '@playwright/test';

export class FirstProductDetailPage {
  readonly page: Page;
  readonly firstProductDetailLink: Locator;
  readonly productDetailHeading: Locator;
  readonly productDetailCategory: Locator;
  readonly productDetailPrice: Locator;
  readonly productDetailAvailability: Locator;
  readonly productDetailCondition: Locator;
  readonly productDetailBrand: Locator;    

  constructor(page: Page) {
    this.page = page;
    this.firstProductDetailLink = page.locator('.choose > .nav > li > a').first();
    this.productDetailHeading = page.getByRole('heading', { name: 'Blue Top' });
    this.productDetailCategory = page.getByText('Category: Women > Tops');
    this.productDetailPrice = page.getByText('Rs. 500 Quantity: Add to cart');
    this.productDetailAvailability = page.getByText('Availability: In Stock');
    this.productDetailCondition = page.getByText('Condition: New');
    this.productDetailBrand = page.getByText('Brand: Polo');
  }

  async verifyFirstProductPageAndDetail() {
    await this.firstProductDetailLink.click();
    await expect(this.page).toHaveURL("https://automationexercise.com/product_details/1");
    await expect(this.productDetailHeading).toBeVisible();
    await expect(this.productDetailCategory).toBeVisible();
    await expect(this.productDetailPrice).toBeVisible();
    await expect(this.productDetailAvailability).toBeVisible();
    await expect(this.productDetailCondition).toBeVisible();
    await expect(this.productDetailBrand).toBeVisible();
  }

  async addProductToCart(quantity: number) {
    await this.page.locator('#quantity').fill(quantity.toString())
    await this.page.getByRole('button', { name: ' Add to cart' }).click();
  }
}