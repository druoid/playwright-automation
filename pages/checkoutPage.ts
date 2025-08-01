import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly addressDelivery: Locator;
    readonly addressInvoice: Locator;
    readonly cartTotalPrice: Locator;
    readonly orderComment: Locator;
    readonly placeOrderButton: Locator;


    constructor(page: Page, user: { firstName: string; lastName: string; company: string; address: string; address2: string; country: string; state: string; city: string; zipcode: string; mobileNumber: string; }) {
        this.page = page
        this.addressDelivery = page.getByText(`Your delivery address Mr. ${user.firstName} ${user.lastName} ${user.company} ${user.address} ${user.address2} ${user.city} ${user.state} ${user.zipcode} ${user.country} ${user.mobileNumber}`);
        this.addressInvoice = page.getByText(`Your billing address Mr. ${user.firstName} ${user.lastName} ${user.company} ${user.address} ${user.address2} ${user.city} ${user.state} ${user.zipcode} ${user.country} ${user.mobileNumber}`);
        this.cartTotalPrice = page.locator('tr:has(h4:has-text("Total Amount")) .cart_total_price');  
        this.orderComment = page.locator('textarea[name="message"]');
        this.placeOrderButton = page.getByRole('link', { name: 'Place Order' });
    }

    async validateAddresses() {
        expect(this.addressDelivery).toBeVisible();
        expect(this.addressInvoice).toBeVisible();
    }

    async verifyCartTotalPrice(expectedTotal: number) {
        const totalText = await this.cartTotalPrice.textContent();
        const totalPrice = parseFloat((totalText ?? '').replace('Rs. ', ''));
        expect(totalPrice).toBeCloseTo(expectedTotal, 2);
    }

    async fillOrderComment() {
        await this.orderComment.fill("test message");
    }

    async placeOrder() {
        await this.placeOrderButton.click();
    }
}  