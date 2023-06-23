import React from 'react';

interface ConvertButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

function ConvertButton({ onClick, disabled }: ConvertButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      Convert to JSON
    </button>
  );
}

export default ConvertButton;
