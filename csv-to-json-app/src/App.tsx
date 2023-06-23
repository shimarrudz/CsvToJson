import React, { useState } from 'react';
import FileInput from './components/FileInput';
import ConvertButton from './components/ConvertButton';
import { convertCSVToJSON, downloadJSONFile } from './utils';
import './App.css';

function App() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [conversionErrors, setConversionErrors] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };

  const handleConvertClick = () => {
    if (selectedFiles) {
      const errors: string[] = [];

      Array.from(selectedFiles).forEach((file) => {
        convertCSVToJSON(file)
          .then((jsonData) => {
            downloadJSONFile(jsonData, file.name);
          })
          .catch((error) => {
            const errorMessage = `Error converting file: ${file.name} - ${error.message}`;
            errors.push(errorMessage);
            console.error(errorMessage);
          })
          .finally(() => {
            setConversionErrors(errors);
          });
      });
    }
  };

  return (
    <div>
      <h1>CSV to JSON Converter</h1>
      {conversionErrors.length > 0 && (
        <div className="error-messages">
          {conversionErrors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      <FileInput onChange={handleFileChange} />
      <ConvertButton onClick={handleConvertClick} disabled={!selectedFiles} />
    </div>
  );
}

export default App;
