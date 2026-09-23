

import{test, expect} from '@playwright/test';
import{LoginPage} from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomePage';

let loginPage:LoginPage;
let homePage: HomePage;

//AAA- Arrange Act Assert
//create the object and go to the login page so that you dont have to repeat these two lines in every test
//loginPage = new LoginPage(page);
//await loginPage.goToLoginPage();
test.beforeEach(async({page})=>{
    loginPage = new LoginPage(page);
   await loginPage.goToLoginPage();
   homePage = new HomePage(page);
   
});

// page here is the inbuilt fixture
// now i dont want to use this test file as I want to use loginpagefix.spec.ts so i can use test.skip()
test.skip('login page title test', async ({ }) =>{
 // we can comment these two as we have used them in before each
//    loginPage = new LoginPage(page);
//    await loginPage.goToLoginPage();
   let pageTitle = await loginPage.getLoginPageTitle();
   console.log('Login page title : ', pageTitle);
   expect(pageTitle).toBe('Account Login');

});

 
test.skip('forgot password link exist test', async ({  }) =>{
// we can comment these two as we have used them in before each    
//    loginPage = new LoginPage(page);
//    await loginPage.goToLoginPage();
   expect(await loginPage.isForgottenPwdLinkExist()).toBeTruthy();
   
});

test.skip('user is able to login to the application', async ({  }) =>{
// we can comment these two as we have used them in before each
//    loginPage = new LoginPage(page);
//    await loginPage.goToLoginPage();
   await loginPage.doLogin('sasmita.brown419@test.com','pw123');
   expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
   expect.soft(await homePage.getHomePageTitle()).toBe('My Account');
    
});


test.skip('Header H2 Tests', async ({  }) =>{
  //expect(await loginPage.isHeaderVisible()).toBeTruthy();
  expect(await loginPage.isHeaderVisible('New Customer')).toBe(true);
  expect(await loginPage.isHeaderVisible('Returning Customer')).toBe(true);
      
});

