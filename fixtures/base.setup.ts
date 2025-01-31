import { test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    page.setDefaultTimeout(10000);
    await use(page);
  },
});
