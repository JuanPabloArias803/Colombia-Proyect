export function validHeader(headerRow:string[]){

    const tableHeader=["REGION","CÓDIGO DANE DEL DEPARTAMENTO","DEPARTAMENTO","CÓDIGO DANE DEL MUNICIPIO","MUNICIPIO"];
    const validFlag=headerRow.every(column=>tableHeader.includes(column));
    return validFlag;
    
}