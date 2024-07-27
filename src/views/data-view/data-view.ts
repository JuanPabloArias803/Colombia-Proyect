import { isValidDataArray } from '../../helpers/format-validator';
import { renderTable } from '../../helpers/renderTable';
import { transformCsvData } from '../../helpers/transform-csv';
import { city } from '../../models/interfaces';
import './data-view.css';
import * as CryptoJS from 'crypto-js';


export async function DataView(){
    
    //data extract

    const fileContent:string|null=sessionStorage.getItem("fileContent");
    if(!fileContent){
        alert("No hay información para mostrar.");
        return;
    }

    const dataArray:city[]=await transformCsvData(CryptoJS.AES.decrypt(fileContent, 'key-here').toString(CryptoJS.enc.Utf8));    
    
   if(!isValidDataArray(dataArray)){
        alert("Ocurrío un error inesperado.");
        return;
   }

    //render view

   const $root=document.querySelector("#app") as HTMLDivElement;
   $root.innerHTML=`
    <div class="data-view-container">
        <h1>Información DANE municipios de Colombia</h1>
        <div class="table-container"></div>
        <span>
            <button class="previus-btn">Anterior</button>
            <button class="next-btn">Siguiente</button>  
        </span>
    </div>
   `;


    //view logic
    const $previus=document.querySelector(".previus-btn") as HTMLButtonElement;
    const $next=document.querySelector(".next-btn") as HTMLButtonElement;
    const rowsPerPage:number=15; //change if want to see more rows
    const totalPages:number=Math.ceil(dataArray.length/rowsPerPage);
    let currentPage:number=1;
    console.log(totalPages);
    

    renderTable(dataArray,currentPage,rowsPerPage);


    $previus.addEventListener("click",()=>{
        if($next.style.display=="none"){
            $next.style.display="inline";     //if next is disable, make able in next view      
        }
        if(currentPage<=1){
            alert("No se encontraron registros");
            $previus.style.display="none";
            return;
        }
        currentPage-=1;
        renderTable(dataArray,currentPage,rowsPerPage); 
    });


    $next.addEventListener("click",()=>{
        if($previus.style.display=="none"){
            $previus.style.display="inline";     //if previus is disable, make able in next view      
        }
        
        if((currentPage+1)>totalPages){
            alert("No se encontraron registros.");
            $next.style.display="none";
            return;
        }
        currentPage+=1;
        renderTable(dataArray,currentPage,rowsPerPage);
    });

}
