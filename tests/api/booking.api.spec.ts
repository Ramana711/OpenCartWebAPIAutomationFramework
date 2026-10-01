import{test, expect} from '../../src/fixtures/apifixtures';

let tokenID: string;
   

test.beforeEach('generate the token', async({request})=>{
      let creds = {
           username:'admin',
           password: 'password123'
      };

   let authResponse =  await request.post('https://restful-booker.herokuapp.com/auth', {
        headers:{'Content-Type': 'application/json'},
        data: creds  
      });  

      expect(authResponse.status()).toBe(200);
      let jsonResponse = await authResponse.json();
        console.log('Auth API Response:', jsonResponse);
        tokenID = jsonResponse.token;
        console.log('token-------->:', jsonResponse.token);
});

test('@regression bookng CRUD with token', async({request})=>{

  // create a new booking ID: POST -- no token needed:
  let bookingResponse =   await request.post('https://restful-booker.herokuapp.com/booking',{
       headers:{'Content-Type': 'application/json'},
       data:{
           "firstname" : "Chris",
    "lastname" : "Brown",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2019-01-01",
        "checkout" : "2020-01-01"
       },
        "additionalneeds" : "Breakfast"   
    }
});
    expect(bookingResponse.status()).toBe(200);
    let bookingJson = await bookingResponse.json();
    let bookingID =   bookingJson.bookingid;
    console.log('Booking ID:', bookingID);

 // 2. Update a booking by bookingID: needs token
         
    let updatedResponse = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingID}`,{
             headers:{Cookie: `token=${tokenID}`},
             data: {
                 "firstname" : "Jim",
                    "lastname" : "Brown",
                    "totalprice" : 131,
                    "depositpaid" : true,
                    "bookingdates" : {
                        "checkin" : "2020-01-01",
                        "checkout" : "2021-01-01"
                    },
                       "additionalneeds" : "Lunch"
               }
          });

          expect(updatedResponse.status()).toBe(200);
         let updatedJson = await updatedResponse.json();
          expect(updatedJson.totalprice).toBe(131);
          expect(updatedJson.additionalneeds).toBe('Lunch');   

// Delete a booking by bookingID: needs token

   let deleteResponse=  await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingID}`,{
           headers:{Cookie: `token=${tokenID}`}
       });

        expect(deleteResponse.status()).toBe(201);
});


//https://thinking-tester-contact-list.herokuapp.com/