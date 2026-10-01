
import {test, expect} from '../src/fixtures/pagefixtures';
import {CsvHelper} from '../src/utils/CsvHelper';



test.beforeEach(async({loginPage})=>{
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.APP_USERNAME, process.env.APP_PASSWORD);
    
});

let productData = CsvHelper.readCsv('src/testdata/product.csv');
for (let row of productData){
test(`@smoke verify product header- ${row.searchkey}- ${row.productname}`, async({homePage,searchResultsPage, productInfoPage, page})=>{
    await homePage.doSearch(row.searchkey);
    await searchResultsPage.selectProduct(row.productname);
   expect(await productInfoPage.getProductHeader()).toBe(row.productname);
   //await page.pause(); // use page inbuilt feature to pause it
});

//test('verify product images count', async({homePage,searchResultsPage, productInfoPage, page})=>{
test(`@smoke verify product images count- ${row.searchkey}- ${row.productname}`, async({homePage,searchResultsPage, productInfoPage})=>{
    await homePage.doSearch(row.searchkey);
    await searchResultsPage.selectProduct(row.productname);
   expect(await productInfoPage.getproductImagesCount()).toBe(Number(row.imagescount));
  // await page.pause(); // use page inbuilt feature to pause it
});

};

test('@regression verify product information/data', async({homePage,searchResultsPage, productInfoPage, page})=>{
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    let actualProductInfoMap = await productInfoPage.getproductInfo();
    console.log('Actual Product Details: ', actualProductInfoMap);
    expect.soft(actualProductInfoMap.get('productheader')).toBe('MacBook Pro');
    expect.soft(actualProductInfoMap.get('productimagescount')).toBe(4);
    expect.soft(actualProductInfoMap.get('Brand')).toBe('Apple');
    expect.soft(actualProductInfoMap.get('Product Code')).toBe('Product 18');
    expect.soft(actualProductInfoMap.get('Reward Points')).toBe('800');
    expect.soft(actualProductInfoMap.get('Availability')).toBe('Out Of Stock');
    
    expect.soft(actualProductInfoMap.get('productPrice')).toBe('$2,000.00');
     
    expect.soft(actualProductInfoMap.get('extaxprice')).toBe('$2,000.00');

     //await page.pause();
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
     