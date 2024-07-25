
export function transformCsvData(file:File){
    const csvData: any[] = [];
    const fileReader = new FileReader();
            fileReader.readAsText(file);
            fileReader.onload = () => {
                const fileContent = fileReader.result as string;
                const rows = fileContent.split('\n');
                
                for (let i = 0; i < rows.length; i++) {
                    const columns = rows[i].split(',');
                    csvData.push(columns);
                }
            };
            
    return csvData;
}