import fs from 'node:fs';
import path from 'node:path';

function readCSV(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (error, fileData) => {
      if (error) {
        reject(new Error(`Error reading CSV file: ${error.message}`));
        return;
      }

      const rows = splitIntoRows(fileData);
      if (rows.length === 0) {
        reject(new Error('CSV file is empty'));
        return;
      }

      const headers = splitIntoColumns(rows[0]);
      if (headers.length === 0) {
        reject(new Error('CSV file has no header'));
        return;
      }

      const data = extractData(rows.slice(1), headers);
      resolve(data);
    });
  });
}

function splitIntoRows(fileData) {
  return fileData.split('\r\n');
}

function splitIntoColumns(row) {
  return row.split(',');
}

function extractData(rows, headers) {
  return rows.reduce((result, row) => {
    const values = splitIntoColumns(row);
    if (values.length === headers.length) {
      const item = headers.reduce((obj, header, index) => {
        obj[header] = values[index];
        return obj;
      }, {});
      result.push(item);
    }
    return result;
  }, []);
}

async function convertCSVFilesToJSON(inputFolder, outputFolder) {
  try {
    const files = await fs.promises.readdir(inputFolder);

    for (const file of files) {
      if (file.endsWith('.csv')) {
        const csvFilePath = path.join(inputFolder, file);
        const jsonFilePath = path.join(outputFolder, file.replace('.csv', '.json'));

        try {
          const data = await readCSV(csvFilePath);
          const jsonData = JSON.stringify(data, null, 2);
          await fs.promises.writeFile(jsonFilePath, jsonData);
          console.log(`Converted ${file} to JSON successfully.`);
        } catch (error) {
          console.error(`Error converting ${file} to JSON: ${error.message}`);
        }
      }
    }

    console.log('All CSV files have been successfully converted to JSON.');
  } catch (error) {
    console.error(`Error reading input folder: ${error.message}`);
  }
}

const inputFolder = './input';
const outputFolder = './output';

convertCSVFilesToJSON(inputFolder, outputFolder);
