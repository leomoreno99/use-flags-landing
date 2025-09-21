import React, { useState } from 'react';
import { useFlagsState } from 'use-flags-state';
import ToggleButton from './ToggleButton';
import JsonDisplay from './JsonDisplay';
import CodeBlock from './CodeBlock';
import { getCodeTemplate } from '../utils/codeTemplates';
import TabbedContainer from './TabbedContainer';

const SimpleInteractiveExample: React.FC = () => {
  const { flags, setFlags } = useFlagsState({
    showModal: false,
    isModalLoading: false,
    isDarkMode: false,
    isDarkModeLoading: false,
  });

  const { showModal, isModalLoading, isDarkMode, isDarkModeLoading } = flags;

  const [actionLog, setActionLog] = useState<string[]>(['Initial state loaded']);

  const logAction = (action: string) => {
    setActionLog(prev => [...prev.slice(-4), action]); // Keep last 5 entries
  };

  const handleToggleModal = async () => {
    setFlags({ isModalLoading: true, showModal }); // <- showModal maintains its value
    if (showModal) {
      // Closing modal
      logAction('Saving modal state... - other flags reset to initial values');

      // Simulate saving modal state before closing
      await new Promise(resolve => setTimeout(resolve, 600));

      setFlags({}); // <- Is not necessary set showModal to false (it will be reset to initial value)
      logAction('Modal closed and state saved - other flags reset to initial values');
    } else {
      // Opening modal
      logAction('Loading modal data... - other flags reset to initial values');

      // Simulate API call to load modal data
      await new Promise(resolve => setTimeout(resolve, 600));

      setFlags({ showModal: true });
      logAction('Modal opened with data loaded - other flags reset to initial values');
    }
  };

  const handleToggleDarkMode = async () => {
    const newValue = !isDarkMode;
    setFlags({ isDarkModeLoading: true, isDarkMode }); // <- isDarkMode maintains its value
    logAction(`Saving ${newValue ? 'dark' : 'light'} mode preference... - other flags reset to initial values`);

    // Simulate API call to save user preference
    await new Promise(resolve => setTimeout(resolve, 600));

    setFlags({ isDarkMode: newValue });
    logAction(`${newValue ? 'Dark' : 'Light'} mode applied - other flags reset to initial values`);
  };

  return (
    <TabbedContainer
      demoContent={
        <>
          <div>
            {/* Control Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <ToggleButton
                name={showModal ? 'Close Modal' : 'Open Modal'}
                isActive={showModal}
                isLoading={isModalLoading}
                onClick={handleToggleModal}
                variant="section"
              />

              <ToggleButton
                name={isDarkMode ? 'Light Mode' : 'Dark Mode'}
                isActive={isDarkMode}
                isLoading={isDarkModeLoading}
                onClick={handleToggleDarkMode}
                variant="independent"
              />
            </div>

            {/* Visual States */}
            <div className="space-y-4 mt-8 mb-6">
              {showModal && (
                <div className="bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700 p-4 rounded-md">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200">Modal is Open!</h4>
                  <p className="text-blue-600 dark:text-blue-300">Modal data has been loaded successfully.</p>
                </div>
              )}

              {(isModalLoading || isDarkModeLoading) && (
                <div className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700 p-4 rounded-md">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Loading...</h4>
                  <p className="text-yellow-600 dark:text-yellow-300">
                    {isModalLoading && 'Processing modal data...'}
                    {isDarkModeLoading && 'Saving theme preference...'}
                  </p>
                </div>
              )}

              <div className={`p-4 rounded-md border transition-colors ${isDarkMode
                ? 'bg-gray-900 border-gray-700 text-white'
                : 'bg-white border-gray-300 text-gray-900'
                }`}>
                <h4 className="font-semibold">Theme Preview</h4>
                <p>Current mode: {isDarkMode ? 'Dark' : 'Light'}</p>
                {isDarkModeLoading && (
                  <p className="text-sm opacity-75 mt-1">Syncing with server...</p>
                )}
              </div>
            </div>

            {/* Current State Display */}
            <div>
              <h3 className="text-base font-semibold mb-4">Current State</h3>
              <div className="bg-neutral-800 rounded-lg p-4">
                <JsonDisplay data={flags} />
              </div>

              <div className="mt-8">
                <h4 className="text-base font-semibold mb-4 text-gray-300 flex items-center gap-2">
                  <div className='w-2 h-2 bg-blue-400 rounded-full animate-pulse'></div>
                  Actions Log
                </h4>
                <div className="bg-neutral-800 rounded-lg p-4 max-h-40 overflow-y-auto border border-gray-700">
                  <div className="text-sm text-gray-400 space-y-2">
                    {actionLog.map((action, index) => (
                      <div key={index} className="flex justify-between items-center py-1 px-2 rounded bg-gray-700/50 hover:bg-gray-700 transition-colors">
                        <span className='text-gray-300'>{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      }
      codeContent={
        <div>
          <div className="space-y-6">
            <div>
              <h4 className="text-base font-semibold mb-4 text-white">Code Example</h4>
              <CodeBlock code={getCodeTemplate('basicExample')} />
            </div>
          </div>
        </div>
      }
    />
  );
};

export default SimpleInteractiveExample;
