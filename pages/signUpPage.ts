import { Page } from '@playwright/test';
import { user } from '../fixtures/user';

export class SignUpPage {
  constructor(private page: Page) {}

  async enterAccountInformation() {
    await this.page.getByText('Enter Account Information').isVisible();
    await this.page.getByRole('radio', { name: 'Mr.' }).check();
    await this.page
      .getByRole('textbox', { name: 'Password *' })
      .fill(user.password);
    await this.page.locator('#days').selectOption(user.birthdate.day);
    await this.page.locator('#months').selectOption(user.birthdate.month);
    await this.page.locator('#years').selectOption(user.birthdate.year);
    await this.page
      .getByRole('checkbox', { name: 'Sign up for our newsletter!' })
      .check();
    await this.page
      .getByRole('checkbox', { name: 'Receive special offers from' })
      .check();
    await this.page
      .getByRole('textbox', { name: 'First name *' })
      .fill(user.firstName);
    await this.page
      .getByRole('textbox', { name: 'Last name *' })
      .fill(user.lastName);
    await this.page
      .getByRole('textbox', { name: 'Company', exact: true })
      .fill(user.company);
    await this.page
      .getByRole('textbox', { name: 'Address * (Street address, P.' })
      .fill(user.address);
    await this.page
      .getByRole('textbox', { name: 'Address 2' })
      .fill(user.address2);
    await this.page
      .locator('div')
      .filter({ hasText: 'Enter Account Information' })
      .nth(1)
      .isVisible();
    await this.page.getByLabel('Country *').selectOption('New Zealand');
    await this.page.getByRole('textbox', { name: 'State *' }).fill(user.state);
    await this.page
      .getByRole('textbox', { name: 'City * Zipcode *' })
      .fill(user.city);
    await this.page.locator('#zipcode').fill(user.zipcode);
    await this.page
      .getByRole('textbox', { name: 'Mobile Number *' })
      .fill(user.mobileNumber);
    await this.page.getByRole('button', { name: 'Create Account' }).click();
  }
}
