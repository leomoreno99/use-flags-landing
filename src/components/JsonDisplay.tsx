import React from 'react';

interface JsonDisplayProps {
  data: Record<string, any>;
}

const JsonDisplay: React.FC<JsonDisplayProps> = ({ data }) => {
  const formatJsonValue = (key: string, value: any, isLast: boolean = false) => {
    const comma = isLast ? '' : ',';
    
    if (typeof value === 'boolean') {
      return (
        <div key={key} className="ml-4">
          <span className="text-blue-300">"{key}"</span>
          <span className="text-gray-300">: </span>
          <span className={value ? 'font-bold text-green-400' : 'text-red-400'}>
            {value.toString()}
          </span>
          <span className="text-gray-300">{comma}</span>
        </div>
      );
    }
    
    return (
      <div key={key} className="ml-4">
        <span className="text-blue-300">"{key}"</span>
        <span className="text-gray-300">: </span>
        <span className="text-yellow-300">{JSON.stringify(value)}</span>
        <span className="text-gray-300">{comma}</span>
      </div>
    );
  };

  const entries = Object.entries(data);
  
  return (
    <div className="text-sm font-mono">
      <div className="text-gray-300">{'{'}</div>
      {entries.map(([key, value], index) => 
        formatJsonValue(key, value, index === entries.length - 1)
      )}
      <div className="text-gray-300">{'}'}</div>
    </div>
  );
};

export default JsonDisplay;
