
import process from 'process';
import{test, expect} from '../../src/fixtures/apifixtures';


// null check(!) to avoid warning
//whenever you are using environment variable, always use null check 
const TOKEN = process.env.API_TOKEN!;

let AUTH_HEADER = {
  Authorization: `Bearer ${TOKEN}`,
};
 let userId:number;

test.describe.serial('running e2e go rest crud apis tests',()=>{

 //GET Test:
    test('GET API- get all users', async({apiHelper})=>{
    let response = await apiHelper.get('/public/v2/users', AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
        
    });

  //POST
   test('POST API -create a user', async({apiHelper})=>{
    let userData = {
     name: `Morgans_${Math.floor(Math.random()*10)}`,
     email: `Mspector_${Date.now()}@opencart.com`,
     gender: 'male',
     status: 'active'
  };
       
      let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
       expect((response).status).toBe(201);
        userId=  response.body.id;
        console.log(`created user id : userId`);

   });


  //PUT
   test('PUT API -updtate a user', async({apiHelper})=>{
    let userData = {
     name: `Morgans_${Math.floor(Math.random()*10)}`,
     status: 'inactive'
  };
       
      let response = await apiHelper.put(`/public/v2/users/${userId}`, userData, AUTH_HEADER);
       expect((response).status).toBe(200);
       expect(response.body.name).toBe(userData.name);
       expect(response.body.status).toBe(userData.status);

   });

  //DELETE
   test('DELETE API -delete a user', async({apiHelper})=>{
      
      let response = await apiHelper.delete(`/public/v2/users/${userId}`, AUTH_HEADER);
       expect((response).status).toBe(204);
     

   });



});