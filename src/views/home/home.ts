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
                <button type='submit'>Upload</button>
            </form>
        </div>
    `;

    //view logic

    const $fileForm=document.getElementById('file-form') as HTMLFormElement;
    const $file=document.getElementById('file') as HTMLInputElement;
    $fileForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        const file: File = $file.files![0];
        if (!file) {
            alert("No file selected");
            return;
        }
        const cities:city[]=transformCsvData(file);
        console.log(cities[0]);
      
        
    });
}