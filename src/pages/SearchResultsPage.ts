  import { Locator, Page } from "@playwright/test";
  import { BasePage } from "./BasePage";

  
    export class SearchResultsPage extends BasePage {
  
    //private locators:
      private readonly searchResults: Locator;
   
          

   //constructor... of the class... init the locators
    constructor(page:Page){
        super(page);
         this.searchResults = page.locator('div.product-layout');

    };

    //page action:

    async getProductSearchResultsCount():Promise<number> {
        return await this.searchResults.count();
    }

    // these are the dynamic locators
    async selectProduct(productName:string): Promise<void> {
        console.log('Product Name:', productName);
        await  this.page.getByRole('link',{name: productName, exact:true}).first().click();

    }

}