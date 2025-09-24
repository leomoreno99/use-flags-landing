import React from 'react';

type BoxVariant = 'section' | 'independent';
interface DisplayBoxProps {
  name: string;
  isVisible: boolean;
  isLoading: boolean;
  variant: BoxVariant;
}

const variantStyles: Record<BoxVariant, string> = {
  section: 'bg-gradient-to-br from-blue-400 to-blue-500 shadow-blue-500/25',
  independent: 'bg-gradient-to-br from-purple-400 to-purple-500 shadow-purple-500/25'
};

const DisplayBox: React.FC<DisplayBoxProps> = ({
  name,
  isVisible,
  isLoading,
  variant
}) => {
  const activeStyles = `${variantStyles[variant]} text-white shadow-lg scale-103`;
  const inactiveStyles = 'bg-white text-black';
  const loadingStyles = isLoading ? 'animate-pulse opacity-75' : '';
  const hiddenStyles = !isVisible ? 'opacity-30' : '';

  return (
    <div className={`box transition-all duration-500 flex items-center justify-center ${
      isVisible ? activeStyles : inactiveStyles
    } ${loadingStyles} ${hiddenStyles}`}>
      <p className='font-medium'>{name}</p>
      {isVisible && (
        <div className='absolute top-2 right-2 w-2 h-2 bg-white rounded-full'></div>
      )}
    </div>
  );
};

export default DisplayBox;
