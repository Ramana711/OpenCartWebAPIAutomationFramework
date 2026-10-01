
import {CsvHelper} from '../src/utils/CsvHelper';
import{test,expect} from '../src/fixtures/pagefixtures';
import{Excelhelper} from '../src/utils/ExcelHelper';
import{JsonHelper} from '../src/utils/JsonHelper';
import { meta } from 'reporting-labs';

//import { LoginPage } from '../src/pages/LoginPage';


test.beforeEach(async({loginPage, page})=>{
    await loginPage.goToLoginPage();
  });

  //AAA
  test('@smoke login page title test', async ({loginPage} ) =>{
      //let pageTitle = await loginPage.getLoginPageTitle();
     meta({priority:'High', severity:'Medium'});
     let pageTitle = await loginPage.getPageTitle();
     console.log('Login page title : ', pageTitle);
     expect(pageTitle).toBe('Account Login');
  
  });
  
   
  test('@regression forgot password link exist test', async ({loginPage}) =>{
    expect(await loginPage.isForgottenPwdLinkExist()).toBeTruthy();
     
  });
  
  test('@regression user is able to login to the app with valid credentials', async ({loginPage, homePage}) =>{
  // we can comment these two as we have used them in before each
  //    loginPage = new LoginPage(page);
  //    await loginPage.goToLoginPage();
     //await loginPage.doLogin('sasmita.brown419@test.com','pw123');
     await loginPage.doLogin(process.env.APP_USERNAME, process.env.APP_PASSWORD);
     expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
     expect.soft(await homePage.getHomePageTitle()).toBe('My Account');

  });

  test('@smoke verify Register page', async({loginPage, page})=>{
       await loginPage.clickRegister();
       expect(await page.title()).toBe('Register Account');
       //await page.pause();

  });
  //DD_0: using test data from fixtures:sequence run
 test(`@regression login to app with invalid credentials with fixture data`, async({loginPage, testData})=>{
  //console.log(testData.length);
    for (let row of testData ){
         await loginPage.doLogin(row.username, row.password);
         expect(await loginPage.isInvalidLogingErrorDisplayed()).toBeTruthy();
    }   
 });


  //pros:
  // light-weight, easy to maintain/read, 3rd party library is also available
  // good for large set of test data
  // DD_1 = read csv data directly from the csv file and loop the test method row wise...
  // if you are coming from selenium TestNG background: data provider annotation and we have to do the mapping  between data provider and test
let testCSVData = CsvHelper.readCsv('src/testdata/logindata.csv');
 for(let row of testCSVData) {
   test(`@regression login to app with invalid credentials with CSV data- ${row.username} - ${row.password}`, async({loginPage, homePage})=>{
         await loginPage.doLogin(row.username, row.password);
         expect(await loginPage.isInvalidLogingErrorDisplayed()).toBeTruthy();
 });
};

//DD_2: read xlsx data directly from the excel file and loop the test data method row wise
//cons:
// 1. maintenance- 
// 2. MS-licenses
//

let testExcelData = Excelhelper.readExcel('src/testdata/opencarttestdata.xlsx','login');
 for(let row of testExcelData) {
   test(`@regression login to app with invalid credentials with Excel Data- ${row.username} - ${row.password}`, async({loginPage, homePage})=>{
         await loginPage.doLogin(row.username, row.password);
         expect(await loginPage.isInvalidLogingErrorDisplayed()).toBeTruthy();
 });
};

//DD_3: read JSON data directly from the JSON file and loop the test data method row wise
// Pros:
 // 1. inbuilt method(parse) available--because serialization and deserialization are available
 // 2. lightweight, smaller data source
 // ** when you have large set of test data, CSV is better to use

let testJSONData = JsonHelper.readJson('src/testdata/logindata.json');
 for(let row of testJSONData) {
   test(`@regression login to app with invalid credentials with Json Data- ${row.username} - ${row.password}`, async({loginPage, homePage})=>{
         await loginPage.doLogin(row.username, row.password);
         expect(await loginPage.isInvalidLogingErrorDisplayed()).toBeTruthy();
 });

};
 //common features test:
   
 test('@smoke App logo exists on Login page', async({ basePage})=>{
    expect(await basePage.isLogoVisible()).toBeTruthy();
    });


 test('@smoke Search box exists Login page', async({ basePage})=>{
    expect(await basePage.isSearchBoxVisible()).toBeTruthy();
    });
   
 test('@smoke Cart exists Login page', async({ basePage})=>{
    expect(await basePage.isCartButtonVisible()).toBeTruthy();
    });
   
  
 test('@smoke  Footers count verification', async({ basePage})=>{
    expect(await basePage.getPageFootersCount()).toBe(16);
    });
     
