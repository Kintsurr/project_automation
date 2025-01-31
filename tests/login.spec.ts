import { test } from '../fixtures/base.setup';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login Tests', () => {
  test('successful login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('Admin', 'admin123');
    const isDashboardVisible = await loginPage.verifyDashboardVisible();
    expect(isDashboardVisible).toBeTruthy();
  });

  test('unsuccessful login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('InvalidUser', 'InvalidPass');
    const isErrorMessageVisible = await loginPage.verifyErrorMessageVisible();
    expect(isErrorMessageVisible).toBeTruthy();
  });

  test('remember me functionality', async ({ page }) => {
    const loginPage = new LoginPage(page);
    console.log("There is no chekbox for remember me")
    await loginPage.login('Admin', 'admin123', true);
    //There is no chekbox for remember me
    await page.context().storageState({ path: 'auth.json' }); // Save session state
    expect(await loginPage.verifyDashboardVisible()).toBeTruthy();
  });
});
