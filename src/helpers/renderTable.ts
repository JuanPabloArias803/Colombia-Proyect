import { city } from '../models/interfaces';

export function renderTable(
  dataArray: city[],
  currentPage: number,
  rowsPerPage: number
) {
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const copy = dataArray.slice(startIndex, endIndex);

  let tableRows: string = '';
  copy.forEach((row) => {
    tableRows += `
          <tr>
              <td>${row[0]}</td>
              <td>${row[1]}</td>
              <td>${row[2]}</td>
              <td>${row[3]}</td>
              <td>${row[4]}</td>
          </tr>
          `;
  });
  const $tableContainer = document.querySelector(
    '.table-container'
  ) as HTMLDivElement;
  $tableContainer.innerHTML = `
            <table>
                <tr>
                    <th>REGION</th>
                    <th>CÓDIGO DANE DEL DEPARTAMENTO</th>
                    <th>DEPARTAMENTO</th>
                    <th>CÓDIGO DANE DEL MUNICIPIO</th>
                    <th>MUNICIPIO</th>
                </tr>
                ${tableRows}
            </table>
    `;
  return;
}
