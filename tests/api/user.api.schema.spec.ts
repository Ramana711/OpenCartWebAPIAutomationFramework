// contract or schema testing--- we test type of data not data
// Playwright doesnt support schema testing..  we use third party utility(ajv)

// schema : type of response data
// ajv - node lib for the schema validation
// npm install ajv
//https://transform.tools/json-to-json-schema

//AJV is a JavaScript/TypeScript library for validating JSON data against a JSON Schema.
//In simple terms, you define what your API response or request is supposed to look like, and AJV checks
//  whether the actual JSON matches that structure.
//Playwright checks the API call. AJV checks the structure of the API data.
//For your Playwright TypeScript framework, AJV is useful when you want reusable API response schema validation,
//  rather than manually checking every individual field with many expect() statements.

import {test, expect} from '../../src/fixtures/apifixtures';
import Ajv from 'ajv';

const TOKEN = process.env.API_TOKEN!;

let AUTH_HEADER = {
  Authorization: `Bearer ${TOKEN}`,
};

// Setup the AJV library:

let ajv = new Ajv(); // like car class bmw

//define - JSON Schema:

let userSchema = {
   "type": "object",
  "properties": {
    "id": {
      "type": "number"
    },
    "name": {
      "type": "string"
    },
    "email": {
      "type": "string"
    },
    "gender": {
      "type": "string"
    },
    "status": {
      "type": "string"
    }
  },
  "required": [
    "id",
    "name",
    "email",
    "gender",
    "status"
   ]
};

let userArraySchema= {
    "type": "array",
     "items": userSchema
};

test('get a user - schema test', async({apiHelper})=>{

  let userData = {
    // name: `apiautomation${Math.floor(Math.random()*10)}`,
     name: 'apiautomation4567',
     email: `apiautomation${Date.now()}@opencart.com`,
     gender: 'male',
     status: 'active'
  };
       
      let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
       expect((response).status).toBe(201);
       let userId = response.body.id;
       console.log('created user id: ', userId);

  //get a user:
    let getUserResponse = await apiHelper.get(`/public/v2/users/${userId}`,  AUTH_HEADER);   
      expect((getUserResponse.status)).toBe(200);
    // verify response schema

      let validate = ajv.compile(userSchema);
         let isSchemaValid = validate(getUserResponse.body);
           if(!isSchemaValid){
              console.log("Schema Errors", validate.errors);
           } 
         
           expect(isSchemaValid).toBeTruthy();
    
});

test('get all users - schema test', async({apiHelper})=>{

 //get all users:
    let getUsersResponse = await apiHelper.get(`/public/v2/users`,  AUTH_HEADER);   
      expect((getUsersResponse.status)).toBe(200);
    // verify response schema

      let validate = ajv.compile(userArraySchema);
         let isSchemaValid = validate(getUsersResponse.body);
           if(!isSchemaValid){
              console.log("Schema Errors", validate.errors);
           } 
         
           expect(isSchemaValid).toBeTruthy();
 
});



