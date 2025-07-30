import { Page, Locator, expect } from '@playwright/test';

export class ContactUsPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly fileUploadButton: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly homeLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'GET IN TOUCH' });
    this.nameInput = page.getByRole('textbox', { name: 'Name' });
    this.emailInput = page.getByRole('textbox', { name: 'Email', exact: true });
    this.subjectInput = page.getByRole('textbox', { name: 'Subject' });
    this.messageInput = page.getByRole('textbox', { name: 'Your Message Here' });
    this.fileUploadButton = page.getByRole('button', { name: 'Choose File' });
    this.submitButton = page.getByTestId('submit-button');
    this.successMessage = page.locator('#contact-page').getByText('Success! Your details have');
    this.homeLink = page.getByRole('link', { name: ' Home' });
  }

  async verifyOnContactUsPage() {
    await expect(this.page).toHaveURL('https://automationexercise.com/contact_us');
    await expect(this.heading).toBeVisible();
  }

  async fillContactForm(user) {
    await this.nameInput.fill(`${user.firstName} ${user.lastName}`);
    await this.emailInput.fill(user.email);
    await this.subjectInput.fill('Test Subject');
    await this.messageInput.fill('Test Message');
  }

  async uploadFile(filePath = './fixtures/file.txt') {
    await this.fileUploadButton.setInputFiles(filePath);
  }

  async submitFormWithDialogConfirmation() {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await this.page.waitForLoadState('networkidle');
    await this.submitButton.click();
  }

  async verifySuccessMessage() {
    await expect(this.successMessage).toBeVisible();
  }

  async goHome() {
    await this.homeLink.click();
  }
}

