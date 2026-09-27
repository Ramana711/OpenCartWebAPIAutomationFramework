import { Locator, Page } from "@playwright/test";
  import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
   //private locators:
         private readonly logoutLink: Locator;
         private readonly headers: Locator;
       //  private readonly searchBox: Locator;
        // private readonly searchIcon: Locator;

 //constructor... of the class... init the locators
    constructor(page:Page){
        super(page);
         this.logoutLink = page.getByRole('link',{name:'Logout'});
         this.headers = page.getByRole('heading', {level:2}); // returns more than 1 element
        // this.searchBox = page.getByRole('textbox', {name: 'Search'});
        // this.searchIcon = page.locator('#search button');
    }

  // page actions
   async isLogoutLinkExist():Promise<boolean>{
       return await this.logoutLink.isVisible();

   };

}