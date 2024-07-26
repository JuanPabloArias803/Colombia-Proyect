
export async function transformCsvData(file:File){
    const csvData: any[] = [];
    const fileContent:string=await file.text();
    const rows = fileContent.split('\n');
    for (let i = 0; i < rows.length; i++) {
        const columns = rows[i].split(',');
        csvData.push(columns);
    };
    return csvData;
}