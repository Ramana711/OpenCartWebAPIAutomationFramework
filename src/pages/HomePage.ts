  import { Locator, Page } from "@playwright/test";
  import { BasePage } from "./BasePage";


  export class HomePage extends BasePage {
  
    //private locators:
      private readonly logoutLink: Locator;
      private readonly headers: Locator;
      private readonly searchBox: Locator;
      private readonly searchIcon: Locator;
          

   //constructor... of the class... init the locators
    constructor(page:Page){
        super(page);
         this.logoutLink = page.getByRole('link',{name:'Logout'});
         this.headers = page.getByRole('heading', {level:2}); // returns more than 1 element
         this.searchBox = page.getByRole('textbox', {name: 'Search'});
         this.searchIcon = page.locator('#search button');
   }

   // page actions
   async isLogoutLinkExist():Promise<boolean>{
       return await this.logoutLink.isVisible();
   }

   async getHomePageHeaders():Promise<string[]>{
      return await this.headers.allInnerTexts();
   }


   async getHomePageTitle(): Promise<string>{
      return await this.page.title();
 }

 // Important tip -- function name should represent behavior of the method/function- user is doing search
 // behavior of the product.
  
   async doSearch(searchKey: string):Promise<void>  {
       console.log('search key:', searchKey);
       await this.searchBox.fill(searchKey);
       await this.searchIcon.click();
        
   }
 

  }