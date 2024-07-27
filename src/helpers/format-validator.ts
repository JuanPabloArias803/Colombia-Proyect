import { city } from "../models/interfaces";

function isValidHeader(headerRow:string[]){

    const tableHeader=["REGION","CÓDIGO DANE DEL DEPARTAMENTO","DEPARTAMENTO","CÓDIGO DANE DEL MUNICIPIO","MUNICIPIO"];
    const validFlag=headerRow.every(column=>tableHeader.includes(column));

    return validFlag;
}

export function isValidDataArray(dataArray:city[]):boolean{
    
    let validFlag:boolean=true;
    dataArray.forEach(row => {
        if (row.length !== 5||row.includes("")) {
            console.log(row);
            
            validFlag=false;
        }
    });
    return(isValidHeader(dataArray[0])&&validFlag); 
}