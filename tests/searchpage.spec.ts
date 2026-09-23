
import {test, expect} from '../src/fixtures/pagefixtures';
import {CsvHelper} from '../src/utils/CsvHelper';
import{Excelhelper} from '../src/utils/ExcelHelper';

test.beforeEach(async({loginPage})=>{
    await loginPage.goToLoginPage();
    //await loginPage.doLogin('sasmita.brown419@test.com','pw123');
    await loginPage.doLogin(process.env.APP_USERNAME, process.env.APP_PASSWORD);
    
});

// data provider:
let productData = CsvHelper.readCsv('src/testdata/product.csv');
for (let row of productData){

test(`verify search results count - ${row.searchkey} - ${row.productname}`, async({homePage, searchResultsPage})=>{
  await homePage.doSearch(row.searchkey);
  let actResultCount = await searchResultsPage.getProductSearchResultsCount();
   console.log('Search Results Count: ', actResultCount);
   expect(actResultCount).toBe(Number(row.resultcount));

});
}

//AAA
// DD_1-CSV
for (let row of productData){
test(`verify user is able to land on the product page - ${row.searchkey} - ${row.productname}`, async({homePage, searchResultsPage, page})=>{
    await homePage.doSearch(row.searchkey);
    await searchResultsPage.selectProduct(row.productname);
    // As this will navigate to product info page and have not created page objects-- to get title, we need to use page in built obj
    // you can do the destructuring page-- -inherit inbuilt features-- page 
    expect(await page.title()).toBe(row.productname);
       
});
};

//DD_2 --Excel data
let productExcelData = Excelhelper.readExcel('src/testdata/opencarttestdata.xlsx','product');
for (let row of productExcelData){
test(`verify user is able to land on the product page with Exceldata - ${row.searchkey} - ${row.productname}`, async({homePage, searchResultsPage, page})=>{
    await homePage.doSearch(row.searchkey);
    await searchResultsPage.selectProduct(row.productname);
    // As this will navigate to product info page and have not created page objects-- to get title, we need to use page in built obj
    // you can do the destructuring page-- -inherit inbuilt features-- page 
    expect(await page.title()).toBe(row.productname);
       
});

};