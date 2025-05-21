import { Page, expect } from '@playwright/test';
import { user } from '../fixtures/user';

export class ContactUsPage {
  constructor(private page: Page) {}

  async verifyContactUsPage() {
    await expect(this.page).toHaveURL(
      'https://automationexercise.com/contact_us',
    );
    const heading = this.page.getByRole('heading', {
      name: 'GET IN TOUCH',
    });
    await expect(heading).toBeVisible();
  }

  async fillContactUsForm() {
    await this.page
      .getByRole('textbox', { name: 'Name' })
      .fill(user.firstName + ' ' + user.lastName);
    await this.page
      .getByRole('textbox', { name: 'Email', exact: true })
      .fill(user.email);
    await this.page
      .getByRole('textbox', { name: 'Subject' })
      .fill('Test Subject');
    await this.page
      .getByRole('textbox', { name: 'Your Message Here' })
      .fill('Test Message');
  }

  async uploadFile() {
    const filePath = './fixtures/file.txt'; 
    await this.page
      .getByRole('button', { name: 'Choose File' })
      .setInputFiles(filePath);
  }

  // Register the page.on('dialog', ...) listener before you click the button.
  async clickOnOkButtonListenerAndThenSubmitButton() {   
    this.page.on('dialog', async (dialog) => {
      await dialog.accept(); // Click "OK"
    });
    await this.page.waitForLoadState('networkidle');
    await this.page.getByTestId('submit-button').click();
  }

  async verifySuccessMessage() {
    await this.page.locator('#contact-page').getByText('Success! Your details have').isVisible();
  }

  async clickOnHomeButton() {
    await this.page.getByRole('link', { name: ' Home' }).click();
  }
}
