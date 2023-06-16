// Importando o fs
import fs from 'fs';

// Função que lê o o arquivo CSV
function readCSV(filePath) {
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const rows = fileData.split('\n');
  const headers = rows[0].split(',');

  const data = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i].split(',');
    if (row.length === headers.length) {
      const item = {};
      for (let j = 0; j < headers.length; j++) {
        item[headers[j]] = row[j];
      }
      data.push(item);
    }
  }

  return data;
}

// Função que converte para JSON
function convertToJSON(filePath) {
  const data = readCSV(filePath);
  const jsonData = JSON.stringify(data, null, 2);
  return jsonData;
}
