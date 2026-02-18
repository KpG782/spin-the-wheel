import React from 'react';
import './SpinButton.css';

interface SpinButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const SpinButton: React.FC<SpinButtonProps> = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="spin-button no-select touch-target"
    >
      {disabled ? 'SPINNING...' : 'SPIN TO WIN'}
    </button>
  );
};
