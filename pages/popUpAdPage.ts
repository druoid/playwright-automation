import { Page, Locator } from '@playwright/test';

export class PopUpAdPage {
  readonly page: Page;
  readonly popUpAd: Locator;

  constructor(page: Page) {
    this.page = page;
    this.popUpAd = page.locator('.grippy-host');
  }

  async removePopUpAd() {
    if (await this.popUpAd.isVisible()) {
      await this.popUpAd.click();
      console.log('Popup ad clicked.');
    } else {
      console.log('Popup ad not visible, continuing...');
    }
  }
}
