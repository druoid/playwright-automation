import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly subscriptionText: Locator;
  readonly subscriptionInput: Locator;
  readonly subscriptionButton: Locator;
  readonly subscriptionSuccessMessage: Locator; 
  readonly firstProductName: Locator;
  readonly secondProductName: Locator;
  readonly firstProductPrice: Locator;
  readonly secondProductPrice: Locator;
  readonly firstProductQuantity: Locator;
  readonly secondProductQuantity: Locator;
  readonly firstProductTotal: Locator;
  readonly secondProductTotal: Locator; 

  constructor(page: Page) {
    this.page = page;
    this.subscriptionText = page.locator('#footer');
    this.subscriptionInput = page.getByRole('textbox', { name: 'Your email address' });
    this.subscriptionButton = page.getByRole('button', { name: '' });
    this.subscriptionSuccessMessage = page.getByText('You have been successfully subscribed!');
    this.firstProductName = page.locator('tr#product-1 td.cart_description');
    this.secondProductName = page.locator('tr#product-2 td.cart_description');
    this.firstProductPrice = page.locator('tr#product-1 td.cart_price');
    this.secondProductPrice = page.locator('tr#product-2 td.cart_price');
    this.firstProductQuantity = page.locator('tr#product-1 td.cart_quantity');
    this.secondProductQuantity = page.locator('tr#product-2 td.cart_quantity');
    this.firstProductTotal = page.locator('tr#product-1 td.cart_total');
    this.secondProductTotal = page.locator('tr#product-2 td.cart_total');
  }

  async verifyAddSubscriptionSuccessFromCartPage(user) {
    await expect(this.subscriptionText).toContainText('Subscription');
    await this.subscriptionInput.fill(user.email);
    await this.subscriptionButton.click();
    await expect(this.subscriptionSuccessMessage).toBeVisible();
  }   

  async verifyCartContents() {
    await expect(this.firstProductName).toContainText('Blue Top');
    await expect(this.firstProductPrice).toContainText('Rs. 500');
    await expect(this.firstProductQuantity).toContainText('1');
    await expect(this.firstProductTotal).toContainText('Rs. 500');
    await expect(this.secondProductName).toContainText('Men Tshirt');
    await expect(this.secondProductPrice).toContainText('Rs. 400');
    await expect(this.secondProductQuantity).toContainText('1');
    await expect(this.secondProductTotal).toContainText('Rs. 400');
  }

  async verifyProductQuantitiesInCart(quantity: number) {
    await expect(this.firstProductQuantity).toHaveText(quantity.toString());
  }
}
