import{test, expect} from '@playwright/test';
import{LoginPage} from '../src/pages/LoginPage';

let loginPage:LoginPage;

//create the object and go to the login page so that you dont have to repeat these two lines in every test
//loginPage = new LoginPage(page);
//await loginPage.goToLoginPage();
test.beforeEach(async({page})=>{
    loginPage = new LoginPage(page);
   await loginPage.goToLoginPage();
})

// page here is the inbuilt fixture
test.skip('login page title test', async ({ page }) =>{

   loginPage = new LoginPage(page);
   await loginPage.goToLoginPage();
   let pageTitle = await loginPage.getLoginPageTitle();
   console.log('Login page title : ', pageTitle);
   expect(pageTitle).toBe('Account Login');

});

 
test.skip('forgot password link exist test', async ({ page }) =>{

   loginPage = new LoginPage(page);
   await loginPage.goToLoginPage();
   expect(await loginPage.isForgottenPwdLinkExist()).toBeTruthy();
   
});

test.skip('user is able to login to the application', async ({ page }) =>{
   loginPage = new LoginPage(page);
   await loginPage.goToLoginPage();
   await loginPage.doLogin('sasmita.brown419@test.com','pw123');
   
});