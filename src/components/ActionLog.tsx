import React from 'react';

export interface LogEntry {
  id: number;
  timestamp: string;
  action: string;
}

export type ActionLogData = string[] | LogEntry[];

interface ActionLogProps {
  data: ActionLogData;
  title?: string;
  className?: string;
  maxHeight?: string;
}

const ActionLog: React.FC<ActionLogProps> = ({
  data,
  title = "Actions Log",
  className = "",
  maxHeight = "max-h-40"
}) => {
  const renderLogItem = (item: string | LogEntry, index: number) => {
    if (typeof item === 'string') {
      return (
        <div key={index} className="flex justify-between items-center py-1 px-2 rounded bg-gray-700/50 hover:bg-gray-700 transition-colors">
          <span className='text-gray-300'>{item}</span>
        </div>
      );
    } else {
      return (
        <div key={item.id} className="flex justify-between items-center py-1 px-2 rounded bg-gray-700/50 hover:bg-gray-700 transition-colors">
          <span className='text-gray-500 font-mono text-xs'>[{item.timestamp}]</span>
          <span className='text-gray-300'>{item.action}</span>
        </div>
      );
    }
  };

  return (
    <div className={`mt-8 ${className}`}>
      <h4 className="text-base font-semibold mb-4 text-gray-300 flex items-center gap-2">
        <div className='w-2 h-2 bg-blue-400 rounded-full animate-pulse'></div>
        {title}
      </h4>
      <div className={`bg-neutral-800 rounded-lg p-4 ${maxHeight} overflow-y-auto border border-gray-700`}>
        <div className="text-sm text-gray-400 space-y-2">
          {data.map((item, index) => renderLogItem(item, index))}
        </div>
      </div>
    </div>
  );
};

export default ActionLog;
