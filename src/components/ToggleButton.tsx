import React from 'react';
import Button from './Button';

type ButtonVariant = 'section' | 'box' | 'independent';

interface ToggleButtonProps {
  name: string;
  isActive: boolean;
  isLoading: boolean;
  onClick: () => void;
  variant: ButtonVariant;
  isDisabled?: boolean;
}

const variantStyles: Record<ButtonVariant, { active: string; inactive: string }> = {
  section: {
    active: 'bg-green-500 hover:bg-green-600 text-custom-green shadow-lg shadow-green-500/25',
    inactive: 'bg-white hover:bg-gray-100 text-black'
  },
  box: {
    active: 'bg-blue-500 hover:bg-blue-600 text-custom-green shadow-lg shadow-blue-500/25',
    inactive: 'bg-white hover:bg-gray-100 text-black'
  },
  independent: {
    active: 'bg-purple-500 hover:bg-purple-600 text-custom-green shadow-lg shadow-purple-500/25',
    inactive: 'bg-white hover:bg-gray-100 text-black'
  }
};

const ToggleButton: React.FC<ToggleButtonProps> = ({
  name,
  isActive,
  isLoading,
  onClick,
  variant,
  isDisabled
}) => {
  const styles = variantStyles[variant];
  const loadingState = isLoading ? 'opacity-75 cursor-not-allowed animate-pulse' : '';
  
  return (
    <Button
      name={isLoading ? "Loading..." : name}  
      onClick={isDisabled ? undefined : onClick}
      className={`transition-all duration-300 ${isActive ? styles.active : styles.inactive} ${loadingState} ${isDisabled ? 'cursor-not-allowed opacity-75' : ''}`}
    />
  );
};

export default ToggleButton;
