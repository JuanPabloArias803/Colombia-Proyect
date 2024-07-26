import { validHeader } from '../../helpers/format-validator';
import { transformCsvData } from '../../helpers/transform-csv';
import { city } from '../../models/interfaces';
import './home.css'

export function Home(){
    //render view first time
    
    const $root=document.getElementById('app') as HTMLDivElement;

    $root.innerHTML=`
        <div class="home-container">
            <h1>Home</h1>
            <form id='file-form'>
                <input type='file' id='file' accept='.csv' />
                <button type='submit'>Cargar</button>
            </form>
        </div>
    `;

    //view logic

    const $fileForm=document.getElementById('file-form') as HTMLFormElement;
    const $file=document.getElementById('file') as HTMLInputElement;
    
    $fileForm.addEventListener('submit', async (e)=>{
        e.preventDefault();
        const file: File = $file.files![0];

        if (!file) {
            alert("No ha seleccionado un archivo aún.");
            return;
        }

        if(!$file.value.includes(".csv")){
            alert("El archivo seleccionado no es .csv");
            return;
        }

        const cities:city[]=await transformCsvData(file);

        if(!validHeader(cities[0])){
            alert("El archivo no tiene los títulos correctos.");
            return;
        }

        cities.forEach(function (city, index) {
            if (city.length !== 5) {
                cities.splice(index, 1);
            }
        });

        
        console.log(cities[0]);
        
    });
}