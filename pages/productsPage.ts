import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly productList: Locator;
  readonly productAddedModalMessage: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchedProductsHeading: Locator;
  readonly firstProductOverlay: Locator;
  readonly secondProductOverlay: Locator;
  readonly firstProductAddToCartButton: Locator;
  readonly secondProductAddToCartButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly viewCartButton: Locator;
  readonly brands: Locator;
  readonly poloBrandLink: Locator;
  readonly hmBrandLink: Locator;
  readonly poloSectionHeading: Locator;
  readonly hmSectionHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productList = page.locator('.single-products').first(); // Assuming the first element is representative of the product list
    this.searchInput = page.getByRole('textbox', { name: 'Search Product' });
    this.searchButton = page.getByRole('button', { name: '' });
    this.searchedProductsHeading = page.getByRole('heading', {
      name: 'Searched Products',
    });
    this.firstProductOverlay = page.locator('.product-image-wrapper').first();
    this.secondProductOverlay = page.locator('.product-image-wrapper').nth(1);
    this.firstProductAddToCartButton = page.locator('.overlay-content > .btn').first();
    this.secondProductAddToCartButton = page.locator(
      'div:nth-child(4) > .product-image-wrapper > .single-products > .product-overlay > .overlay-content > .btn',
    );
    this.continueShoppingButton = page.getByRole('button', {
      name: 'Continue Shopping',
    });
    this.viewCartButton = page.getByRole('link', { name: 'View Cart' });
    this.brands = page.locator('div.left-sidebar .brands_products h2');
    this.poloBrandLink = page.getByRole('link', { name: '(6) Polo' });
    this.hmBrandLink = page.getByRole('link', { name: '(5) H&M' });
    this.poloSectionHeading = page.getByRole('heading', {
      name: 'Brand - Polo Products',
    });
    this.hmSectionHeading = page.getByRole('heading', {
      name: 'Brand - H&M Products',
    });
    this.productAddedModalMessage = page.getByText('Your product has been added');
  }

  async verifyProductsPage() {
    await expect(this.page).toHaveURL('https://automationexercise.com/products');
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
    await this.productAddedModalMessage.isVisible();
    await this.continueShoppingButton.click();
    await this.secondProductOverlay.hover();
    await this.secondProductAddToCartButton.click();
    await this.productAddedModalMessage.isVisible();
  }

  async viewCartFromModal() {
    await this.viewCartButton.isVisible();
    await this.viewCartButton.isEnabled();
    await this.viewCartButton.click();
  }

  async verifyBrandsSection() {
    await expect(this.brands.filter({ hasText: /^\s*Brands\s*$/ })).toBeVisible();
  }

  async viewBrandProducts() {
    await this.poloBrandLink.click();
    await expect(this.page).toHaveURL('https://automationexercise.com/brand_products/Polo');
    await expect(this.poloSectionHeading).toContainText('Brand - Polo Products');
    const poloCount = await this.productList.count();
    await expect(poloCount).toBeGreaterThan(0);

    await this.hmBrandLink.click();
    await expect(this.page).toHaveURL('https://automationexercise.com/brand_products/H&M');
    await expect(this.hmSectionHeading).toContainText('Brand - H&M Products');
    const hmCount = await this.productList.count();
    await expect(hmCount).toBeGreaterThan(0);
  }

  async addSearchedSingleProductToCart() {
    await this.firstProductOverlay.hover();
    await this.firstProductOverlay.click();
    await this.firstProductAddToCartButton.click();
  }
}
