import { isValidHeader } from '../../helpers/format-validator';
import { renderTable } from '../../helpers/renderTable';
import { transformCsvData } from '../../helpers/transform-csv';
import { city } from '../../models/interfaces';
import './data-view.css';
import * as CryptoJS from 'crypto-js';

export async function DataView() {
  //data extract

  const fileContent: string | null = sessionStorage.getItem('fileContent');
  if (!fileContent) {
    alert('No hay información para mostrar.');
    return;
  }

  let dataArray: city[] = await transformCsvData(
    CryptoJS.AES.decrypt(fileContent, 'key-here').toString(CryptoJS.enc.Utf8)
  );

  if (!isValidHeader(dataArray)) {
    alert('Ocurrío un error inesperado.');
    return;
  }

  dataArray.shift();

  //render view

  const $root = document.querySelector('#app') as HTMLDivElement;
  $root.innerHTML = `
    <div class="data-view-container">
        <h1>Información DANE municipios de Colombia</h1>
        <div class="table-container"></div>
        <span>
            <button class="previus-btn">Anterior</button>
            <button class="next-btn">Siguiente</button>  
        </span>
        <a class="download-link" style="display:none">Descargar archivo plano</a>
        <input type="text" class="search-input">
    </div>
   `;

  //view logic
  const $previus = document.querySelector('.previus-btn') as HTMLButtonElement;
  const $next = document.querySelector('.next-btn') as HTMLButtonElement;
  const $download = document.querySelector(
    '.download-link'
  ) as HTMLAnchorElement;
  const $search = document.querySelector('.search-input') as HTMLInputElement;
  const rowsPerPage: number = 15; //change if want to see more rows

  let copy = [...dataArray]; // }
  let totalPages: number = Math.ceil(copy.length / rowsPerPage); //  } elements changing with input event
  let currentPage: number = 1; //   }

  renderTable(copy, currentPage, rowsPerPage);

  function downloadLink(): void {
    //create .csv download link
    $download.style.display = 'inline';
    copy.unshift([
      'REGION',
      'CÓDIGO DANE DEL DEPARTAMENTO',
      'DEPARTAMENTO',
      'CÓDIGO DANE DEL MUNICIPIO',
      'MUNICIPIO',
    ]);
    const csvContent = copy.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    $download.href = URL.createObjectURL(blob);
    $download.download = 'filtered-data.csv';
  }

  $search.addEventListener('input', () => {
    //search input
    copy = dataArray.filter((row) => {
      return (
        row[0].toLowerCase().includes($search.value.toLowerCase()) ||
        row[1].toLowerCase().includes($search.value.toLowerCase()) ||
        row[2].toLowerCase().includes($search.value.toLowerCase()) ||
        row[3].toLowerCase().includes($search.value.toLowerCase()) ||
        row[4].toLowerCase().includes($search.value.toLowerCase())
      );
    });

    totalPages = Math.ceil(copy.length / rowsPerPage); //}
    currentPage = 1; // } restart the elements to handle the render and pagination
    renderTable(copy, currentPage, rowsPerPage); //  }
    downloadLink();
  });

  $previus.addEventListener('click', () => {
    //previus button
    if ($next.style.display == 'none') {
      $next.style.display = 'inline'; //if next is disable, make able in next view
    }
    if (currentPage <= 1) {
      alert('No se encontraron registros');
      $previus.style.display = 'none'; //disable previus
      return;
    }
    currentPage -= 1;
    renderTable(copy, currentPage, rowsPerPage);
  });

  $next.addEventListener('click', () => {
    //next button
    if ($previus.style.display == 'none') {
      $previus.style.display = 'inline'; //if previus is disable, make able in next view
    }

    if (currentPage + 1 > totalPages) {
      alert('No se encontraron registros.');
      $next.style.display = 'none'; //disable next
      return;
    }
    currentPage += 1;
    renderTable(copy, currentPage, rowsPerPage);
  });
}
