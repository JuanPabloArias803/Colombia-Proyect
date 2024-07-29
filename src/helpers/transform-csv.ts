import { clearDataArray } from "./format-validator";

export async function transformCsvData(fileContent:string){

    const csvData: any[] = [];
    const rows = fileContent.split('\n');


    for (let i = 0; i < rows.length-1; i++) {
        const columns = rows[i].split(',');
        csvData.push(columns);
    };

    clearDataArray(csvData);
    
    return csvData;
}