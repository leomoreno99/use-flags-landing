import React from 'react';
import CopyButton from './CopyButton';
import type { CodeBlockProps } from '../types';

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  showCopyButton = true,
  className = ""
}) => {
  return (
    <div
      className={`border border-custom-gray p-4 rounded-[6px] ${className}`}
      style={{ background: 'linear-gradient(180deg, #222222 0%, #1A1A1A 100%)' }}
    >
      {showCopyButton && (
        <div className="flex justify-end items-center mb-3">
          <CopyButton text={code} />
        </div>
      )}

      <pre 
        className="text-gray-100 roboto-mono text-base overflow-auto custom-scrollbar"
        style={{
          // scrollbarWidth: 'thin',
          scrollbarColor: '#4B5563 #1F2937',
        }}
      >
        <code>{code}</code>
      </pre>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-scrollbar::-webkit-scrollbar {
            width: 16px;
            height: 16px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #1F2937;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #4B5563;
            border-radius: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #6B7280;
          }
        `
      }} />
    </div>
  );
};

export default CodeBlock;
