import fs from 'fs';

//pros:
  //1.inbuilt method: parse, lightweight,serialization, deserialization, super compatible , no third party libraries needed
  // smaller data source

export class JsonHelper {
   static readJson(filePath:string): Record<string, string>[] {
      // here we have to do the deserialization-->dont need to convert javascript object to json, we have to convert 
      // the json to javascript objec so that we have to use the parse method
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
   }

};
