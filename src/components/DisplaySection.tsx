import React from 'react';
import DisplayBox from './DisplayBox';

interface DisplaySectionProps {
  title: string;
  isVisible: boolean;
  isLoading: boolean;
  boxes: Array<{
    name: string;
    isVisible: boolean;
    isLoading: boolean;
  }>;
}

const DisplaySection: React.FC<DisplaySectionProps> = ({
  title,
  isVisible,
  isLoading,
  boxes
}) => {
  const sectionStyles = isVisible
    ? 'bg-gradient-to-br from-green-500/20 to-green-600/10 border-2 border-green-500/30 shadow-lg shadow-green-500/10'
    : 'bg-gray-800 border-2 border-gray-700';
    
  const loadingStyles = isLoading ? 'animate-pulse' : '';
  const titleColor = isVisible ? 'text-green-400' : 'text-gray-300';

  return (
    <div className={`flex flex-col gap-3 w-full rounded-xl p-6 transition-all duration-500 ${sectionStyles} ${loadingStyles}`}>
      <div className='flex items-center gap-3'>
        <h4 className={`text-lg font-semibold transition-colors duration-300 ${titleColor}`}>
          {title}
        </h4>
        {isVisible && (
          <div className='flex items-center gap-1'>
            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
            <span className='text-xs text-green-400 font-medium'>ACTIVE</span>
          </div>
        )}
      </div>
      <div className='flex gap-3'>
        {boxes.map((box, index) => (
          <DisplayBox
            key={index}
            name={box.name}
            isVisible={box.isVisible}
            isLoading={box.isLoading}
            variant="section"
          />
        ))}
      </div>
    </div>
  );
};

export default DisplaySection;
