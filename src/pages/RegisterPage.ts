import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


// who will call this RegisterPage class-- test will call -- object destructure
export class RegisterPage extends BasePage{
    
    //Private locators
    //private readonly registerAccHeader: Locator;
     private readonly firstname: Locator;
     private readonly lastname: Locator;
     private readonly email: Locator;
     private readonly telephone: Locator;
     private readonly password: Locator;
     private readonly pwdConfirm: Locator;
    // private readonly subscribe: Locator;
     private readonly privacyPolicyChkbox: Locator;
     private readonly continue: Locator;
     private readonly pwdMismatchMsg: Locator;

    
   //private locators
    constructor(page:Page) {
         super(page);
         this.firstname = page.getByPlaceholder('First Name',{exact:true});
         this.lastname = page.getByRole('textbox',{name:'* Last Name',exact:true});
         this.email =page.locator('input#input-email');
         this.telephone= page.getByPlaceholder('Telephone', {exact:true});
         this.password = page.getByRole('textbox', {name:'* Password' , exact:true});
         this.pwdConfirm = page.locator('input#input-confirm');
         // this is radio button, need to use dynamic locator using name property
       //  this.subscribe =  page.getByRole('radio', {name:'No', exact:true});
         this.privacyPolicyChkbox = page.locator('input[name="agree"]');
         this.continue = page.getByRole('button',{name:'Continue',exact:true});
         this.pwdMismatchMsg = page.locator('div.text-danger');
    }

  // public actions:
    async getRegisterPageTitle(){
          return await this.page.title();
    }   

    async enterPersonalDetails(firstname: string, 
                     lastname: string,
                     email: string,
                     telephone: string
                     ): Promise<void>{
        console.log(`personal details: ${firstname},  ${lastname} , ${email} , ${telephone}`);
        await this.firstname.fill(firstname);
        await this.lastname.fill(lastname);
        await this.email.fill(email);
        await this.telephone.fill(telephone);
    }
 
async enterPasswordDetails(password:string, pwdConfirm: string){
     await this.password.fill(password);
     await(this.pwdConfirm).fill(pwdConfirm);
}

async getPasswordMismatchMsg(): Promise<string> {
  return await this.pwdMismatchMsg.innerText();
  }

//Newsletter / Subscribe

    // this is radio button, need to use dynamic locator using name property
  //       this.subscribe =  page.getByRole('radio', {name:'No', exact:true});

  async selectSubscribe(subscribe:string): Promise<void>{
     await this.page.getByRole('radio', {
        name:subscribe, exact:true}).check()
      }

async selectPrivacyPolicychkbox(): Promise<void>{
   await this.privacyPolicyChkbox.setChecked(true);
   }

async clickContinue(): Promise<void>{
  await this.continue.click();
}


}