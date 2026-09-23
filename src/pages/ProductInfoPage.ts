  import { Locator, Page } from "@playwright/test";
  import { BasePage } from "./BasePage";

   export class ProductInfoPage extends BasePage {
  
    //private locators:
      private readonly header: Locator;
      private readonly productImages:Locator;
      private readonly productMetaData: Locator;
      private readonly productPricing:Locator;
      private productInfoMap:Map<string,string | number>; // map contains key and value ; in this case, value can be string or number--pointing to null/undefined, need to initialize
          

   //constructor... of the class... init the locators
    constructor(page:Page){
        super(page);
        this.header = page.getByRole('heading', { level: 1 });
        this.productImages = page.locator('div#content li img');
        //css index concept:
        //  div#content ul.list-unstyled:nth-of-type(1)
        //div#content ul.list-unstyled:nth-of-type(1) li
        this.productMetaData = page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
        this.productPricing = page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
        // initialize this object by creating the new map object
        this.productInfoMap = new Map<string, string|number>();  // this will not be part of my page fixtures
    }
   
  //page actions:
  async getProductHeader(): Promise<string> {
    return await this.header.innerText();
  }  

  async getproductImagesCount():Promise<number> {
     await this.productImages.first().waitFor({state: 'visible'});
      return await this.productImages.count();
        
  }

  // by default this is public, public is calling private methods-- we are using encapsulation concept
 async getproductInfo(): Promise<Map<string, string|number>>{
     this.productInfoMap.set('productheader', await this.getProductHeader());
     this.productInfoMap.set('productimagescount', await this.getproductImagesCount());
     await this.getProductMetaData();
     await this.getProductPriceData();
     return this.productInfoMap;
 } 



// Brand: Apple
// Product Code: Product 18
// Reward Points: 800
// Availability: Out Of Stock

 private async getProductMetaData(): Promise<void> {
   let metaData = await this.productMetaData.allInnerTexts();
    for (let data of metaData) {
        // I have to create a collection over here so that I can store this entire data, can give it to my test
        // use concept of map -- key and value format -- in Java -- hashmap
        // return of split is split array
           let meta =  data.split(':');
           let metaKey = meta[0].trim(); //for e.g: Brand
           let metaValue = meta[1].trim(); // for e.g: Apple

           // Map collection you need to store this key and value in a collection
           // in Java, we use put method, in typescript we use set method
           this.productInfoMap.set(metaKey, metaValue);
      }
 }

  // $2,000.00
  // Ex Tax: $2,000.00
  
  private async getProductPriceData():Promise<void> {

    let priceData = await this.productPricing.allInnerTexts();
    
      let productPrice = priceData[0].trim();
      let exTaxprice =  priceData[1].split(':')[1].trim();  // go directly first index to capture external price data
      this.productInfoMap.set('productPrice', productPrice); // if you dont get the key name, you can define your own key name
      this.productInfoMap.set('extaxprice',exTaxprice); // if you dont get the key name, you can define your own key name
  } 
    

}