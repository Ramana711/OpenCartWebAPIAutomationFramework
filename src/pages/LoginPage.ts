import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


// who will call this LoginPage class-- test will call -- object destructure
export class LoginPage extends BasePage{

  // 1. every page contains private locators and public actions
// 1. private Locators:
    private readonly emailId: Locator;
    private readonly password: Locator;
    private readonly loginBtn: Locator;
    private readonly forgottenPasswordLink: Locator;
    private readonly loginErrorMessage: Locator;
    private readonly h2NewCustomer: Locator;
    private readonly registerlink:Locator;
    

    
//2. constructor of the page class: init the locators:
// whenever we are creating the child class constructor and the child class also having the parent class(BasePage) 
// constructor, we have to use super keyword
    constructor(page:Page) {
        super(page);
        this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password = page.getByRole('textbox', { name: 'Password'});
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.forgottenPasswordLink = page.getByRole('link', { name: 'Forgotten Password' }).first();
        this.loginErrorMessage = page.locator('.alert.alert-danger.alert-dismissible');
        this.h2NewCustomer = page.getByRole('heading', { name: 'New Customer', level: 2 });
        //this.registerlink = page.getByRole('link',{name:'Register', exact:true});
        this.registerlink = page.locator('div.list-group a[href*="account/register"]');
        
    }

//3. public page actions(methods)/ behavior: Encapsulation
// you dont have to write keyword public, by default it will be public

// the below is not encapsulation, simple method
 async goToLoginPage(): Promise<void>{
    // can I use here page reference variable? yes you can inherit from BasePage
    await this.page.goto('opencart/index.php?route=account/login');
}

//  async getLoginPageTitle(): Promise<string>{
//       return await this.page.title();
//  }

 // these methods are using concept of encapsulation because
 // public method using private locator, no one can access outside of this class
 async isForgottenPwdLinkExist():Promise<boolean>{
    return await this.forgottenPasswordLink.isVisible();
 }

 async doLogin(username: string, password:string): Promise<void> {
     console.log(`user creds: ${username} - ${password}`);
     await this.emailId.fill(username);
     await this.password.fill(password);
     await this.loginBtn.click();
     
 }

  async isInvalidLogingErrorDisplayed(): Promise<boolean> {
     return await this.loginErrorMessage.isVisible();
  }

//    async isHeaderVisible_old():Promise<boolean> {
//       //return await this.h2NewCustomer.isVisible();
//       //return await locator.isVisible();
//       //await this.page.getByRole('heading', {name:'headerName', level:2}).isVisible();
//    }

  async isHeaderVisible(headerName: string): Promise<boolean> {
    return  await this.page.getByRole('heading',
            {name:headerName, level:2})
            .isVisible({});
   }

   async clickRegister():Promise<void> {
     //await this.productImages.first().waitFor({state: 'visible'});
     await this.registerlink.waitFor({state:'visible'});
     await this.registerlink.click(); 
   }


}