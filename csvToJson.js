// Importing fs
import fs from 'fs';

// Função that reads a CSV file
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

// Function that convert to JSON
function convertToJSON(filePath) {
  const data = readCSV(filePath);
  const jsonData = JSON.stringify(data, null, 2);
  return jsonData;
}

// Function that has 2 params, inputFolder and outputFolder
function convertCSVFilesToJSON(inputFolder, outputFolder) {
  const files = fs.readdirSync(inputFolder);

  files.forEach((file) => {
    if (file.endsWith('.csv')) {
      const csvFilePath = `${inputFolder}/${file}`;
      const jsonFilePath = `${outputFolder}/${file.replace('.csv', '.json')}`;

      const jsonData = convertToJSON(csvFilePath);
      fs.writeFileSync(jsonFilePath, jsonData);
    }
  });

  console.log('The input files, has been converted successfuly');
}

const inputFolder = './input';  // Input folder, receives CSV files.
const outputFolder = './output';  // Output folder, of JSON files.

convertCSVFilesToJSON(inputFolder, outputFolder);