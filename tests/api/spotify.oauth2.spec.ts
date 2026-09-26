//OAuth 2.0 is a standard way for an application to get permission to call 
// another application's API without sending a username and password on every request.

//oAuth2.0
// before_each:
//1. generate the token: refresh token/access token
//token api: endpoint url, form parms: grant_type, client_id, client_secret
//response:JSON: access token = werwesafserw1232333

//test:
//2. functional api: 
// get/ albums/ users/ products

//Header: {Authorization: Bearer access_token} 
// this access_token will have time limit or validity it might expire in 10 min or 30 minutes etc.. Hence
// we need to write before_each...

//***
 // grant is also called as token -- temporary token
 // Access Token is also called as permanent grant or token
 //JWT is a type of token
// */
// spotify, linkedin,
//------------------

import{test, expect} from '@playwright/test';

let OAUTH_CONFIG = {
     tokenURL:'https://accounts.spotify.com/api/token',
     clientId:process.env.OAUTH_CLIENT_ID!,
     clientSecret: process.env.OAUTH_CLIENT_SECRET!,
     granType: process.env.GRANT_TYPE!
}

let accessToken: string;

test.beforeEach('POST--generate the access token', async({request})=>{
  let response = await request.post(OAUTH_CONFIG.tokenURL, {
       form: {
          grant_type: OAUTH_CONFIG.granType,
          client_id: OAUTH_CONFIG.clientId,
          client_secret: OAUTH_CONFIG.clientSecret
       }
   });
   
   expect(response.status()).toBe(200);
   let jsonResponse = await response.json();  // to generate and store response
         console.log('token api response: ', jsonResponse);
         accessToken = jsonResponse.access_token;
         console.log('access token:', accessToken);
});

test('get albus data test', async({request})=>{
     // https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy

     let baseURL= 'https://api.spotify.com';
     let endPointURL = '/v1/albums/4aawyAB9vmqN3uQ7FjRGTy' ;

     let albumResponse = await request.get(`${baseURL}${endPointURL}`, {
          headers:{
            Authorization: `Bearer ${accessToken}`
          }
     });
        
       expect(albumResponse.status()).toBe(200);
       console.log(await albumResponse.json());
     let jsonBody = await albumResponse.json();
         console.log(jsonBody.total_tracks);
         console.log(jsonBody.external_urls.spotify);
         console.log(jsonBody.images.length);
         expect(jsonBody.images.length).toBe(3);
    });


    // test changes