import React, { useState } from 'react';
import FileInput from './components/FileInput';
import ConvertButton from './components/ConvertButton';
import { convertCSVToJSON, downloadJSONFile } from './utils';
import './App.css'

function App() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };

  const handleConvertClick = () => {
    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file) => {
        convertCSVToJSON(file)
          .then((jsonData) => {
            downloadJSONFile(jsonData, file.name);
          })
          .catch((error) => {
            console.error('Error converting file:', file.name, error);
          });
      });
    }
  };

  return (
    <div>
      <h1>CSV to JSON Converter</h1>
      <FileInput onChange={handleFileChange} />
      <ConvertButton onClick={handleConvertClick} disabled={!selectedFiles} />
    </div>
  );
}

export default App;
