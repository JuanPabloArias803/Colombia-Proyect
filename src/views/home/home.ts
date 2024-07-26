import { NavigateTo } from '../../Router';
import { isValidDataArray } from '../../helpers/format-validator';
import { transformCsvData } from '../../helpers/transform-csv';
import { city } from '../../models/interfaces';
import './home.css';
import * as CryptoJS from 'crypto-js';

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
        const fileContent:string=await file.text();
        const dataArray:city[]=await transformCsvData(fileContent);

        //guards

        if (!file) {
            alert("No ha seleccionado un archivo aún.");
            return;
        }

        if(!$file.value.endsWith(".csv")){
            alert("El archivo seleccionado no es de tipo .csv");
            return;
        }

        if(!isValidDataArray(dataArray)){
            alert("El archivo .csv no cumple con la estructura necesaria.");
            return;
        }

        sessionStorage.setItem("fileContent",CryptoJS.AES.encrypt(fileContent, 'key-here').toString()); //save file content in sessionStorage
        NavigateTo('/') //table view
    });
}