//import{test,expect} from '@playwright/test';
import {CsvHelper} from '../src/utils/CsvHelper';
import{test,expect} from '../src/fixtures/pagefixtures';


test.beforeEach(async({loginPage, page})=>{
    await loginPage.goToLoginPage();
   });


 let testData = CsvHelper.readCsv('src/testdata/registeraccount.csv');
 
 for(let row of testData){
   
test(`register a new account successfully-${row.firstname} `, async({loginPage, registerPage, page})=>{
  
  await loginPage.clickRegister();
  let title = await registerPage.getRegisterPageTitle();
   console.log(`title is ${title}`);
   expect(title).toBe('Register Account');
   await registerPage.enterPersonalDetails(row.firstname, row.lastname, row.email, row.telephone);
   await registerPage.enterPasswordDetails(row.password, row.pwdConfirm);
   //await loginPage.doLogin(row.username, row.password);
     //       expect(await loginPage.isInvalidLogingErrorDisplayed()).toBeTruthy();
    await registerPage.selectSubscribe(row.subscribe);   
    await registerPage.selectPrivacyPolicychkbox();
   // await page.pause();
    await registerPage.clickContinue();
    let accountsuccess =await page.locator('div#content.col-sm-9 h1').innerText();
    expect(accountsuccess).toBe('Your Account Has Been Created!');
    //await page.pause();
  }
)
};

let regtestdata = CsvHelper.readCsv('src/testdata/registerPwdMismatch.csv');
  for(let data of regtestdata){
test(`password mistmatch message verification-${data.firstname}`, async({loginPage, registerPage,page})=>{
  //ACT
   await loginPage.clickRegister();
   let title = await registerPage.getRegisterPageTitle();
    expect(title).toBe('Register Account');
   await registerPage.enterPersonalDetails(data.firstname, data.lastname, data.email, data.telephone);
   await registerPage.enterPasswordDetails(data.password, data.pwdConfirm);
   //await loginPage.doLogin(row.username, row.password);
     //       expect(await loginPage.isInvalidLogingErrorDisplayed()).toBeTruthy();
    await registerPage.selectSubscribe(data.subscribe);   
    await registerPage.selectPrivacyPolicychkbox();
   // await page.pause();
    await registerPage.clickContinue();
    //
    let pwdMisMatchMsg = await registerPage.getPasswordMismatchMsg();
     //expect(pwdMisMatchMsg).toBeTruthy();
     expect(pwdMisMatchMsg).toBe('Password confirmation does not match password!');
     //await page.pause();
})

};