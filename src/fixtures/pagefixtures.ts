
import{test as baseTest} from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import {LoginPage} from '../pages/LoginPage';
import{HomePage} from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductInfoPage } from '../pages/ProductInfoPage';
import { RegisterPage } from '../pages/RegisterPage';
import { CsvHelper } from '../utils/CsvHelper';


// think of type creating a rule or blueprint for data or even a contrac from onlinesources

type pageFixtures = {
    basePage: BasePage,
    loginPage: LoginPage,
    homePage: HomePage,
    searchResultsPage: SearchResultsPage,
    productInfoPage: ProductInfoPage,
    registerPage:RegisterPage,
    testData: Record<string, string>[];
};

// extend the playwright test: uing baseTest.extend: -- use of concept : inheritance,
//  it looks like inheritance not with the classes.
// created alias to test as baseTest as we dont want to disturb the actual test inbuilt fixture of the playwright
// it means now i am going to override the test with my baseTest -- dont want to impact the original test
// along with extend, we need to provide generics as well
// here I want to maintain all my page fixtures-- type of collections--
// store this entire fxiture inside particular test- 

export let test = baseTest.extend<pageFixtures>({

    // using anonymous arrow function and we are destructuring the page with the help of arrown function
    // page is the normal export
    //use is the default export -- typescript feature
    // use needs to be written outside of the curly brackets
    //purpose of use is what exactly you want to give it to the test
    // use is always promise,write await
   basePage: async({page}, use)=>{
         let basePage = new BasePage(page);
        await use(basePage);

   },
   loginPage: async({page}, use)=>{
         let loginPage = new LoginPage(page);
        await use(loginPage);

   },
  homePage: async({page}, use)=>{
         let homePage = new HomePage(page);
         await use(homePage);
   },

    searchResultsPage: async({page}, use)=>{
         let searchResultsPage = new SearchResultsPage(page);
         await use(searchResultsPage);
   },
   
    productInfoPage: async({page}, use)=>{
         let productInfoPage = new ProductInfoPage(page);
         await use(productInfoPage);
   },
  registerPage: async({page}, use)=>{
         let registerPage = new RegisterPage(page);
         await use(registerPage);
   },
   
   testData:async({ }, use)=>{
       let testCSVData = CsvHelper.readCsv('src/testdata/logindata.csv');
       await use(testCSVData);
   }
 

});

// expect is for assertions
export {expect} from '@playwright/test';
