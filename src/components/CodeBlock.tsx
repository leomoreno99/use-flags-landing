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

      <pre className="text-gray-100 roboto-mono text-base overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
