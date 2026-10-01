import{APIRequestContext} from '@playwright/test';

export class ApiHelper {

      private readonly request:APIRequestContext;
      private readonly baseURL:string;

      constructor(request:APIRequestContext, baseURL:string){
         this.request = request,
         this.baseURL = baseURL
      }

    //helper methods:// these are generic methods

  //GET
    async get(endPoint: string, headers?: Record<string, string>) {
        let response = await this.request.get(`${this.baseURL}${endPoint}`, {
            headers: headers
        });

        //the below will avoid calling twice : The main issue is that you call response.json() twice:
        const body1 = await response.json();
        //console.log(await response.json(), response.status());
        console.log(body1,response.status());
        return {
            status: response.status(),
            //body: await response.json()
            body: body1
        };
    }


  //POST
    async post(endPoint: string, data: object, headers?: Record<string, string>) {
        let response = await this.request.post(`${this.baseURL}${endPoint}`, {
            headers: headers,
            data: data
        });
        console.log(await response.json(), response.status());

        return {
            status: response.status(),
            body: await response.json()
        }
    }


  //PUT
    async put(endPoint: string, data: object, headers?: Record<string, string>) {
        let response = await this.request.put(`${this.baseURL}${endPoint}`, {
            headers: headers,
            data: data
        });
        console.log(await response.json(), response.status());

        return {
            status: response.status(),
            body: await response.json()
        }
    }



  //DELETE
    async delete(endPoint: string, headers?: Record<string, string>) {
        let response = await this.request.delete(`${this.baseURL}${endPoint}`, {
            headers: headers
        });
        console.log(response.status());

        return {
            status: response.status(),
        }
    }




}