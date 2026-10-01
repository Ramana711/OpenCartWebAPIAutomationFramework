
import{test, expect} from '../src/fixtures/pagefixtures';

test.beforeEach(async({loginPage})=>{
    await loginPage.goToLoginPage();
    //await loginPage.doLogin('sasmita.brown419@test.com','pw123');
    await loginPage.doLogin(process.env.APP_USERNAME, process.env.APP_PASSWORD);
    
});


test('@smoke home page title test', async({homePage})=>{
 let pageTitle=   await homePage.getHomePageTitle();
 console.log('home page title: ', pageTitle);
  expect(pageTitle).toBe('My Account');

});


test('@smoke logout link exist test', async({homePage}) =>{
   expect(await homePage.isLogoutLinkExist()).toBeTruthy();

});

test('@regression home page headers exist test', async({homePage})=>{
    let allHeaders:string[] = await homePage.getHomePageHeaders();
    console.log('home page headers: ', allHeaders);
     expect.soft(allHeaders).toHaveLength(4);
     expect.soft(allHeaders).toEqual([ 'My Account', 'My Orders',
      'My Affiliate Account',  'Newsletter'
     ])
});