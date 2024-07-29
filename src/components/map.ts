

import { citiesPerState } from '../helpers/states';
import Highcharts from 'highcharts/highmaps'
import { transformCsvData } from '../helpers/transform-csv';
import { city } from '../models/interfaces';
import * as CryptoJS from 'crypto-js';

export async function ColombiaMap(){

    const fileContent: string | null = sessionStorage.getItem('fileContent');
    if (!fileContent) {
      alert('No hay información para mostrar.');
      return;
    }
  
    let dataArray: city[] = await transformCsvData(
      CryptoJS.AES.decrypt(fileContent, 'key-here').toString(CryptoJS.enc.Utf8)
    );

    const {antioquia,
        cundinamarca,
        boyaca,
        cordoba,
        choco,
        nariño,
        santander,
        meta,
        atlantico,
        bolivar,
        caldas,
        caqueta,
        cauca,
        cesar,
        huila,
        guajira,
        magdalena,
        quindio,
        risaralda,
        sucre,
        tolima,
        arauca,
        casanare,
        putumayo,
        amazonas,
        guainia,
        vaupes,
        vichada,
        guaviare,
        islas,
        capital,
        nortesantander,
        vallecauca}=citiesPerState(dataArray);
    const topology = await fetch(
        'https://code.highcharts.com/mapdata/countries/co/co-all.topo.json'
    ).then(response => response.json());

    // Prepare demo data. The data is joined to map using value of 'hc-key'
    // property by default. See API docs for 'joinBy' for more info on linking
    // data and map.
    const data = [
        ['co-sa', islas], ['co-ca', cauca], ['co-na', nariño], ['co-ch', choco],
        ['co-3653', 0], ['co-to', tolima], ['co-cq', caqueta], ['co-hu', huila],
        ['co-pu', putumayo], ['co-am', amazonas], ['co-bl', bolivar], ['co-vc', vallecauca],
        ['co-su', sucre], ['co-at', atlantico], ['co-ce', cesar], ['co-lg', guajira],
        ['co-ma', magdalena], ['co-ar', arauca], ['co-ns', nortesantander], ['co-cs', casanare],
        ['co-gv', guaviare], ['co-me', meta], ['co-vp', vaupes], ['co-vd', vichada],
        ['co-an', antioquia], ['co-co', cordoba], ['co-by', boyaca], ['co-st', santander],
        ['co-cl', caldas], ['co-cu', cundinamarca], ['co-1136', capital], ['co-ri', risaralda],
        ['co-qd', quindio], ['co-gn', guainia]
    ];


    Highcharts.mapChart('map-container', {
        chart: {
            map: topology
        },

        title: {
            text: 'Cantidad de municipios por departamento en Antioquia'
        },

        subtitle: {
            text: 'Source map: <a href="https://code.highcharts.com/mapdata/countries/co/co-all.topo.json">Colombia</a>'
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            min: 0
        },

        series: [{
            data: data,
            name: 'https://www.datos.gov.co/',
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }]
    });

};