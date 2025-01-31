export class EmployeePage {
    constructor(private page) {}
  
    // Locators
    private PIMButton = 'span:has-text("PIM")';
    private addEmployeeButton = 'button:has-text("Add")';
    private firstNameInput = 'input[name="firstName"]';
    private lastNameInput = 'input[name="lastName"]';
    private saveButton = 'button:has-text("Save")';
    private searchInput = 'input[placeholder="Type for hints..."]';
    private searchButton = 'button:has-text("Search")';
    private imageSelector = 'img[src="/web/images/default-photo.png"]';
    private verify = 'div:has-text("John")';
    private newSrc = 'https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg';
    // Actions
    async addEmployee(firstName: string, lastName: string) {
      await this.page.click(this.PIMButton);
      await this.page.click(this.addEmployeeButton);
      await this.page.fill(this.firstNameInput, firstName);
      await this.page.fill(this.lastNameInput, lastName);
      await this.uploadPicture(this.imageSelector, this.newSrc);
      await this.page.click(this.saveButton);
    }

    
    async uploadPicture(imageSelector: string, newSrc: string) {
      const imageLocator = this.page.locator(imageSelector);
      await imageLocator.evaluate((img, newSource) => {
        img.src = newSource;
      }, newSrc);
    }
    async searchEmployee(name: string) {
      await this.page.click(this.PIMButton);
      await this.page.fill(this.searchInput, name);
      await this.page.click(this.searchButton);
    }
  
    async verifyEmployeeExists(name: string) {
      await this.page.waitForSelector('.orangehrm-edit-employee-name', { state: 'visible' });
      return this.page.isVisible('.orangehrm-edit-employee-name');
    }

    async verifySearchedEmployee(name: string) {
      await this.page.waitForSelector(this.verify, { state: 'visible' });
      return this.page.isVisible(this.verify);
    }
  }
  