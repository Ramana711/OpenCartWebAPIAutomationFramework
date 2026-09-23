
//import { ApiHelper } from '../../src/api/ApiHelper';
import{test, expect} from '../../src/fixtures/apifixtures';

const TOKEN = process.env.API_TOKEN;

let AUTH_HEADER = {
  Authorization: `Bearer ${TOKEN}`,
};

// helper - generic function - create a user (POST CALL):

async function createUser( apiHelper: any) {
    let userData = {
    // name: `apiautomation${Math.floor(Math.random()*10)}`,
     name: 'apiautomation',
     email: `apiautomation${Date.now()}@opencart.com`,
     gender: 'male',
     status: 'active'
  };
       
      let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
       expect((response).status).toBe(201);
        return response.body;
}

// Test1 : Create a user test + Verify: AAA

// POST--> UserID--> GET/userID--verify

test('Create a user test', async({apiHelper})=>{
     // create a user:
       let userResponse = await createUser(apiHelper);
    
       // get a user id:
      let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
       expect((getResponse.status)).toBe(200);
       expect((getResponse.body.name)).toBe('apiautomation');    

});

//Test 2: Update a user test + verify: AAA
// POST--> UserID--> GET/userID--PUT /user id --GET/Userid -->verify
test('update a user test', async({apiHelper})=>{
     // 1. create a user:
       let userResponse = await createUser(apiHelper);
     //2.  get a user id:
      let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
       expect((getResponse.status)).toBe(200);
       expect((getResponse.body.name)).toBe('apiautomation');    
   // 3. update a user

      let userUpdatedData = {
          name: 'apiautomation-update',
          status: 'inactive'
      }

     let updateResponse = await apiHelper.put(`/public/v2/users/${userResponse.id}`,userUpdatedData, AUTH_HEADER);
         expect((updateResponse.status)).toBe(200);
         expect.soft((updateResponse.body.name)).toBe(userUpdatedData.name); 
         expect.soft((updateResponse.body.status)).toBe(userUpdatedData.status);   

    //4. get a user:     
         getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
       expect((getResponse.status)).toBe(200);
       expect((getResponse.body.name)).toBe(userUpdatedData.name); 
        expect.soft((getResponse.body.status)).toBe(userUpdatedData.status);      
       
});

// to be continued
//Test 3: Delete a user test + verify: AAA
// POST--> UserID--> GET/userID--Delete /user id(204) --GET/Userid(404) -->verify
test('Delete a user test', async({apiHelper})=>{
     // 1. create a user:
       let userResponse = await createUser(apiHelper);
     //2.  get a user id:
      let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
       expect((getResponse.status)).toBe(200);
       expect((getResponse.body.name)).toBe('apiautomation');    
   // 3. delete a user

    let deleteResponse = await apiHelper.delete(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
         expect((deleteResponse.status)).toBe(204);
        
    //4. get a user:     
         getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
       expect((getResponse.status)).toBe(404);
       expect((getResponse.body.message)).toBe('Resource not found'); 
              
});
