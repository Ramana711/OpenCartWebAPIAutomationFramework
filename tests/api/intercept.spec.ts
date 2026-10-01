

import{test, expect} from '@playwright/test';

//web app --> intercept the network calls and log them.. how many network calls are happening

// **/* --> wildcard pattern for URLs

test('intercept and log requests', async({page})=>{

   await page.route('**/*', async(route)=>{
          console.log(route.request().method(), route.request().url());

          await route.continue();  //url1 -- capture, url2-- capture.....
   });

   // navigate to web app:
  await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home');

});


//intercept with mocking:
// mocking: fake data/response:


test('mock search data api', async({page})=>{

   let fakeProducts = [
       { name: 'Fake Macbook Pro', price: '$599' },
        { name: 'Fake Iphone 18', price: '$5999' },
   ];

   // https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook
  await page.route('**/index.php?route=product/search&search=macbook', async (route)=>{
        await route.fulfill({
              status:200,
              contentType: 'application/json',
              body: JSON.stringify(fakeProducts)
        });

  });
    await page.goto('https://abc.com/index.php?route=product/search&search=macbook');
     await page.pause();
});

test('@smoke mock search page with fake HTML', async({page})=>{

  await page.route('**/index.php?route=product/search&search=macbook', async(route)=>{
           await route.fulfill({
               status : 200,
               contentType: 'text/html',
               body: `
                 <html>
                 <body>
                   <h1> Search Results </h1>
                   <div class = "product-layout">
                       <h4><a         
                     `
          });
  });


})