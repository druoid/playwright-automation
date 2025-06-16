import { Page, Locator, expect } from '@playwright/test';
import { user } from '../fixtures/user';

export class SignUpPage {
  readonly page: Page;
  readonly sectionTitle: Locator;
  readonly genderRadio: Locator;
  readonly passwordInput: Locator;
  readonly daySelect: Locator;
  readonly monthSelect: Locator;
  readonly yearSelect: Locator;
  readonly newsletterCheckbox: Locator;
  readonly offersCheckbox: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly addressInput: Locator;
  readonly address2Input: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityZipInput: Locator;
  readonly zipInput: Locator;
  readonly mobileInput: Locator;
  readonly createAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sectionTitle = page.getByText('Enter Account Information');
    this.genderRadio = page.getByRole('radio', { name: 'Mr.' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password *' });
    this.daySelect = page.locator('#days');
    this.monthSelect = page.locator('#months');
    this.yearSelect = page.locator('#years');
    this.newsletterCheckbox = page.getByRole('checkbox', { name: 'Sign up for our newsletter!' });
    this.offersCheckbox = page.getByRole('checkbox', { name: 'Receive special offers from' });
    this.firstNameInput = page.getByRole('textbox', { name: 'First name *' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last name *' });
    this.companyInput = page.getByRole('textbox', { name: 'Company', exact: true });
    this.addressInput = page.getByRole('textbox', { name: 'Address * (Street address, P.' });
    this.address2Input = page.getByRole('textbox', { name: 'Address 2' });
    this.countrySelect = page.getByLabel('Country *');
    this.stateInput = page.getByRole('textbox', { name: 'State *' });
    this.cityZipInput = page.getByRole('textbox', { name: 'City * Zipcode *' });
    this.zipInput = page.locator('#zipcode');
    this.mobileInput = page.getByRole('textbox', { name: 'Mobile Number *' });
    this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
  }

  async enterAccountInformation() {
    await expect(this.sectionTitle).toBeVisible();

    await this.genderRadio.check();
    await this.passwordInput.fill(user.password);
    await this.daySelect.selectOption(user.birthdate.day);
    await this.monthSelect.selectOption(user.birthdate.month);
    await this.yearSelect.selectOption(user.birthdate.year);

    await this.newsletterCheckbox.check();
    await this.offersCheckbox.check();

    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.companyInput.fill(user.company);
    await this.addressInput.fill(user.address);
    await this.address2Input.fill(user.address2);

    await this.countrySelect.selectOption('New Zealand');
    await this.stateInput.fill(user.state);
    await this.cityZipInput.fill(user.city);
    await this.zipInput.fill(user.zipcode);
    await this.mobileInput.fill(user.mobileNumber);

    await this.createAccountButton.click();
  }
}

