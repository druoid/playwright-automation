import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly productList: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchedProductsHeading: Locator;
  readonly searchResults: Locator;
  readonly firstProductOverlay: Locator;
  readonly secondProductOverlay: Locator;
  readonly firstProductAddToCartButton: Locator;
  readonly secondProductAddToCartButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly viewCartButton: Locator;
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
    this.productList = page.locator('.single-products').first(); // Assuming the first element is representative of the product list
    this.searchInput = page.getByRole('textbox', { name: 'Search Product' });
    this.searchButton = page.getByRole('button', { name: '' });
    this.searchedProductsHeading = page.getByRole('heading', { name: 'Searched Products' });
    this.firstProductOverlay = page.locator('.product-image-wrapper').first();
    this.secondProductOverlay = page.locator('.product-image-wrapper').nth(1);
    this.firstProductAddToCartButton = page.locator('.overlay-content > .btn').first();
    this.secondProductAddToCartButton = page.locator('div:nth-child(4) > .product-image-wrapper > .single-products > .product-overlay > .overlay-content > .btn');
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.viewCartButton = page.getByRole('link', { name: 'View Cart' });
    this.firstProductName = page.locator('tr#product-1 td.cart_description');
    this.secondProductName = page.locator('tr#product-2 td.cart_description');
    this.firstProductPrice = page.locator('tr#product-1 td.cart_price');
    this.secondProductPrice = page.locator('tr#product-2 td.cart_price');
    this.firstProductQuantity = page.locator('tr#product-1 td.cart_quantity');
    this.secondProductQuantity = page.locator('tr#product-2 td.cart_quantity');
    this.firstProductTotal = page.locator('tr#product-1 td.cart_total');
    this.secondProductTotal = page.locator('tr#product-2 td.cart_total');

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

  async addProductsToCart() {
    await this.firstProductOverlay.hover();
    await this.firstProductOverlay.click();
    await this.firstProductAddToCartButton.click();
    await this.continueShoppingButton.click();
    await this.secondProductOverlay.hover();
    await this.secondProductAddToCartButton.click();
  }

  async viewCart() {
    await this.viewCartButton.click();  
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
}