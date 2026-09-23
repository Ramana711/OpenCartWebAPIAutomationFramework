
import XLSX from 'xlsx';

export class Excelhelper{

// Record is used for heavy data
  static readExcel(filePath: string, sheetName:string): Record<string, string>[]{
      const workbook = XLSX.readFile(filePath);
      const sheet = workbook.Sheets[sheetName]; // its an array
      return XLSX.utils.sheet_to_json<Record<string, string>>(sheet, {defval: ""});
  }

};