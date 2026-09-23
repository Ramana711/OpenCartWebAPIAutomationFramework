
// fs means file system object
import fs from "fs";
import {parse} from 'csv-parse/sync';
// why sync: all workers will run in parallel and in sync mode


// light weight , easy to maintain/read

export class CsvHelper {
    // we need to create static method-- only one copy will be stored in memory
    //static  readCsv(filePath: string):Record<string, string>[] {
    static  readCsv(filePath: string):Record<string, string>[] {
        // you need to supply file path and encoding(always use utf-8 standard encoding)
       return parse(fs.readFileSync(filePath, 'utf-8'), {
            columns: true,  // first row is always a consider a headers row
            skip_empty_lines: true,
            trim: true,
        }) as Record<string, string>[];  // what kind of data structure do you want to use -- with csv --
        //  record and it holds key and value pair
    }

}