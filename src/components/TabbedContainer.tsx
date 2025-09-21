import React, { useState } from 'react';
import { TabButton } from './TabButton';

interface TabbedContainerProps {
  demoContent: React.ReactNode;
  codeContent: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const TabbedContainer: React.FC<TabbedContainerProps> = ({
  demoContent,
  codeContent,
  className = "border border-custom-gray p-4 rounded-[6px]",
  style = { background: 'linear-gradient(180deg, #222222 0%, #1A1A1A 100%)' }
}) => {
  const [activeTab, setActiveTab] = useState<'demo' | 'code'>('demo');

  return (
    <div className={className} style={style}>
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-700 mb-8">
        <TabButton
          onClick={() => setActiveTab('demo')}
          activeTab={activeTab}
          label="Live Demo"
          variant="demo"
        />
        <TabButton
          onClick={() => setActiveTab('code')}
          activeTab={activeTab}
          label="Code"
          variant="code"
        />
      </div>

      <div className="flex flex-col gap-8">
        {activeTab === 'demo' && demoContent}
        {activeTab === 'code' && codeContent}
      </div>
    </div>
  );
};

export default TabbedContainer;
