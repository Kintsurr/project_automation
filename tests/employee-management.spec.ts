import { test } from '../fixtures/base.setup';
import { expect } from '@playwright/test';
import { EmployeePage } from '../pages/employee.page';
import { LoginPage } from '../pages/login.page';

test.describe('Employee Management', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('Admin', 'admin123');
  });

  test('add new employee', async ({ page }) => {
    const employeePage = new EmployeePage(page);
    await employeePage.addEmployee('John', 'Doe');
    const isEmployeeAdded = await employeePage.verifyEmployeeExists();
    expect(isEmployeeAdded).toBeTruthy();
  });

  test('search and verify employee', async ({ page }) => {
    const employeePage = new EmployeePage(page);
    await employeePage.searchEmployee('John Doe');
    const isEmployeeFound = await employeePage.verifySearchedEmployee();
    expect(isEmployeeFound).toBeTruthy();
  });
});
