/*
using exceljs
convert the excel file with the following Fields to json:
PMT Data Collector Name,PMT Username, Phone Number, Supervisor Name, Supervisor Phone number, Country,
Country Spray Target, Level 1 Name, Level 1 Spray Target, Level 2 Name, Level 2 Spray, Target, Level 3 Name, 
Level 3 Spray Target, Level 4 Name, Level 4 Spray Target
*/

import XLSX from 'exceljs';

export const readExcelFile = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = event => {
      const data = event.target.result;
      const workbook = new XLSX.Workbook();
      workbook.xlsx.load(data).then(workbook => {
        const worksheet = workbook.getWorksheet(1);
        const json = XLSX.utils.sheet_to_json(worksheet);
        resolve(json);
      });
    };
    reader.onerror = event => {
      reject(event);
    };
    reader.readAsArrayBuffer(file);
  });
};
