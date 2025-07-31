import { Page, Locator, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class PaymentPage {
    readonly page: Page;
    readonly cardName: Locator;
    readonly cardCVC: Locator;
    readonly cardNumber: Locator;
    readonly cardExpiryMonth: Locator;
    readonly cardExpiryYear: Locator;
    readonly payButton: Locator;
    readonly orderSuccessMessage: Locator; 
    readonly deleteAccountLink: Locator;
    readonly accountDeletedMessage: Locator;    
    readonly accountDeletedContinueButton: Locator;




    constructor(page: Page) {
        this.page = page
        this.cardName = page.getByTestId('name-on-card');
        this.cardCVC = page.getByTestId('cvc');
        this.cardNumber = page.getByTestId('card-number');
        this.cardExpiryMonth = page.getByTestId('expiry-month');
        this.cardExpiryYear = page.getByTestId('expiry-year');
        this.payButton = page.getByTestId('pay-button');
        this.orderSuccessMessage = page.locator('#form').getByText('Congratulations! Your order has been confirmed!');
        this.deleteAccountLink = page.getByRole('link', { name: ' Delete Account' });
        this.accountDeletedMessage = page.locator('#form').getByText('Account Deleted!');
        this.accountDeletedContinueButton = page.getByTestId('continue-button');
    }

    async fillPaymentDetailsAndSubmitPayment(firstName: string, lastName: string) {
        await this.cardName.fill(firstName + ' ' + lastName);        
        await this.cardCVC.fill(faker.finance.creditCardCVV());
        await this.cardNumber.fill(faker.finance.creditCardNumber());
        await this.cardExpiryMonth.fill(faker.date.month());
        await this.cardExpiryYear.fill(faker.date.future().getFullYear().toString());
        await this.payButton.click();
     }

    async verifyOrderSuccess() {
        await expect(this.orderSuccessMessage).toBeVisible();
     }

    async deleteAccountAndContinue() {
        await this.deleteAccountLink.click();
        await expect(this.accountDeletedMessage).toBeVisible();
        await expect(this.accountDeletedContinueButton).toBeVisible();
        await this.accountDeletedContinueButton.click();
    }
}