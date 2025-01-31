export class LoginPage {
    constructor(private page) {}
  
    private userNameInput = 'input[name="username"]';
    private passwordInput = 'input[name="password"]';
    private loginButton = 'button[type="submit"]';
    private rememberMeCheckbox = 'input[type="checkbox"]';
    private dashboardHeader = '.oxd-topbar-header-title';
    private errorMessage = '.oxd-alert';
  
    async login(username: string, password: string, rememberMe: boolean = false) {
      await this.page.fill(this.userNameInput, username);
      await this.page.fill(this.passwordInput, password);
      if (rememberMe) {
        await this.page.check(this.rememberMeCheckbox);
      }
      await this.page.click(this.loginButton);
    }
  
    async verifyDashboardVisible() {
      await this.page.waitForURL('**/dashboard/index');
      await this.page.waitForSelector('.oxd-topbar-header-title', { state: 'visible' });
      return this.page.isVisible('.oxd-topbar-header-title');
    }
  
    async verifyErrorMessageVisible() {
      await this.page.waitForSelector(this.errorMessage);
      return this.page.isVisible(this.errorMessage);
    }
  }