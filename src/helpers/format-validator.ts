import { city } from '../models/interfaces';

export function isValidHeader(dataArray: city[]) {
  const tableHeader = [
    'REGION',
    'CÓDIGO DANE DEL DEPARTAMENTO',
    'DEPARTAMENTO',
    'CÓDIGO DANE DEL MUNICIPIO',
    'MUNICIPIO',
  ];
  const validFlag = dataArray[0].every((column) =>
    tableHeader.includes(column)
  );

  return validFlag;
}

export function clearDataArray(dataArray: city[]): void {
  for (let i = 0; i < dataArray.length; i++) {
    if (dataArray[i].length !== 5 || dataArray[i].includes('')) {
      dataArray.splice(i, 1);
    }
  }
}
