import { city } from "../models/interfaces";

function isValidHeader(headerRow:string[]){

    const tableHeader=["REGION","CÓDIGO DANE DEL DEPARTAMENTO","DEPARTAMENTO","CÓDIGO DANE DEL MUNICIPIO","MUNICIPIO"];
    const validFlag=headerRow.every(column=>tableHeader.includes(column));

    return validFlag;
}

export function isValidDataArray(dataArray:city[]):boolean{

    dataArray.forEach(row => {
        if (row.length !== 5) {
            return false            
        }
    });

    return(isValidHeader(dataArray[0])); 
}