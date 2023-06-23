import React from 'react';

interface FileInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function FileInput({ onChange }: FileInputProps) {
  return (
    <input type="file" accept=".csv" multiple onChange={onChange} />
  );
}

export default FileInput;
