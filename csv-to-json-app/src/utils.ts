function convertCSVToJSON(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const fileData = event.target.result as string;
          const rows = fileData.split('\n');
          const headers = rows[0].split(',');
  
          const data: any[] = [];
          for (let i = 1; i < rows.length; i++) {
            const row = rows[i].split(',');
            if (row.length === headers.length) {
              const item: { [key: string]: string } = {};
              for (let j = 0; j < headers.length; j++) {
                item[headers[j]] = row[j];
              }
              data.push(item);
            }
          }
  
          const jsonData = JSON.stringify(data, null, 2);
          resolve(jsonData);
        } else {
          reject('Failed to read file');
        }
      };
      reader.readAsText(file);
    });
  }
  
  function downloadJSONFile(jsonData: string, fileName: string) {
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName.replace('.csv', '.json')}`;
    a.click();
    URL.revokeObjectURL(url);
  }
  
  export { convertCSVToJSON, downloadJSONFile };
  