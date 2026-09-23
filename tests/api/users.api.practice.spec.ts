
import {test, expect, request, APIResponse} from '@playwright/test';

let AUTH_TOKEN = {
    Authorization: 'Bearer 0abfe82397cd791835cea042abbe7d825ba1728699e1d0a73794bc5038be2c0a'
};

test('get user api test', async ({ request})=>{

   let response: APIResponse =await request.get('https://gorest.co.in/public/v2/users/', {
     headers: AUTH_TOKEN
   });
    //console.log(response);
    let jsonbody = await response.json();
    console.log(jsonbody);
    console.log(response.status());
    console.log(response.statusText());

    expect(response.status()).toBe(200);
      
});

test('create a user POST api test', async({ request})=>{

  // User JS Object:
  let userData = {
     name: `Morgan_${Math.floor(Math.random()*10)}`,
     email: `Mspector_${Date.now()}@opencart.com`,
     gender: 'male',
     status: 'active'
  }
  //JS Object --> Convert into JSON( this process is called Serialization)
  // JSON.stringify(); converts a Javascript value to a JSON

   let response = await request.post('https://gorest.co.in/public/v2/users', {
         headers: AUTH_TOKEN,
         data: userData
   });
   
   let jsonBody = await response.json();
    console.log(jsonBody);
    console.log(response.status()); //201
    console.log(response.statusText()); //Created

    expect(response.status()).toBe(201);
 
  });

  test('Update a user PUT api test', async({ request})=>{

  // User JS Object:
  let userData = {
     name: 'Ben smith',
     email: 'csmith2342@opencart.com',
     gender: 'male',
     status: 'inactive'
  }
  //JS Object --> Convert into JSON( this process is called Serialization)
  // JSON.stringify(); converts a Javascript value to a JSON

   let response = await request.put('https://gorest.co.in/public/v2/users/8617501', {
         headers: AUTH_TOKEN,
         data: userData
   });
   
   let jsonBody = await response.json();
    console.log(jsonBody);
    console.log(response.status()); //200
    console.log(response.statusText()); //OK

    expect(response.status()).toBe(200);
 
  });


  
  test('Delete a user DEL api test', async({ request})=>{

 
  //JS Object --> Convert into JSON( this process is called Serialization)
  // JSON.stringify(); converts a Javascript value to a JSON

   let response = await request.delete('https://gorest.co.in/public/v2/users/8617504', {
         headers: AUTH_TOKEN,
         });
   
   console.log(response.status()); //204 
    console.log(response.statusText()); //No Content

    expect(response.status()).toBe(204);
 
  });