import React, { useState } from 'react';
import { useFlagsState } from 'use-flags-state';
import ToggleButton from './ToggleButton';
import JsonDisplay from './JsonDisplay';
import CodeBlock from './CodeBlock';
import { getCodeTemplate } from '../utils/codeTemplates';
import TabbedContainer from './TabbedContainer';
import StatusCard from './StatusCard';
import ActionLog from './ActionLog';

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
              {(isModalLoading || isDarkModeLoading) && (
                <StatusCard
                  variant="warning"
                  title="Loading..."
                  description={
                    isModalLoading && isDarkModeLoading
                      ? 'Processing modal data... Saving theme preference...'
                      : isModalLoading
                        ? 'Processing modal data...'
                        : 'Saving theme preference...'
                  }
                />
              )}

              {showModal && (
                <StatusCard
                  variant="success"
                  title="Modal is Open!"
                  description="Modal data has been loaded successfully."
                />
              )}

              <StatusCard
                variant="theme"
                title="Theme Preview"
                description={`Current mode: ${isDarkMode ? 'Dark' : 'Light'}`}
                isDarkMode={isDarkMode}
                additionalContent={
                  isDarkModeLoading && (
                    <p className="text-sm opacity-75 mt-1">Syncing with server...</p>
                  )
                }
              />
            </div>

            {/* Current State Display */}
            <div>
              <h3 className="text-base font-semibold mb-4">Current State</h3>
              <div className="bg-neutral-800 rounded-lg p-4">
                <JsonDisplay data={flags} />
              </div>

              <ActionLog data={actionLog} />
            </div>
          </div>
        </>
      }
      codeContent={
        <div>
          <div className="space-y-6">
            <CodeBlock code={getCodeTemplate('basicExample')} />
          </div>
        </div>
      }
    />
  );
};

export default SimpleInteractiveExample;
