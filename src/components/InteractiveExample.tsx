import React, { useState } from 'react';
import type { LogEntry } from '../types';
import { useFlagsState } from 'use-flags-state';
import ToggleButton from './ToggleButton';
import DisplaySection from './DisplaySection';
import DisplayBox from './DisplayBox';
import JsonDisplay from './JsonDisplay';
import CodeBlock from './CodeBlock';
import { getCodeTemplate } from '../utils/codeTemplates';

const InteractiveExample: React.FC = () => {
  const { flags, setFlags } = useFlagsState({
    isSection1Show: false,
    isSection2Show: false,
    isBox1Show: false,
    isBox2Show: false,
    isBox3Show: false,
    isBox4Show: false,
    isBox5Show: false,
    isBox6Show: false,
    isSection1Loading: false,
    isSection2Loading: false,
    isBox1Loading: false,
    isBox2Loading: false,
    isBox3Loading: false,
    isBox4Loading: false,
    isBox5Loading: false,
    isBox6Loading: false,
  }, false);

  const [logEntries, setLogEntries] = useState<LogEntry[]>([
    { id: 1, timestamp: new Date().toLocaleTimeString(), action: 'Initial state loaded' }
  ]);

  const [activeTab, setActiveTab] = useState<'demo' | 'code'>('demo');

  const logAction = (action: string) => {
    const newEntry: LogEntry = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      action
    };

    setLogEntries(prev => {
      const updated = [...prev, newEntry];
      return updated.slice(-10); // Keep only last 10 entries
    });
  };

  const toggleFlag = async (flagName: string) => {
    const showFlag = `is${flagName.charAt(0).toUpperCase() + flagName.slice(1)}Show`;
    const loadingFlag = `is${flagName.charAt(0).toUpperCase() + flagName.slice(1)}Loading`;

    // Set loading state
    setFlags({ [loadingFlag]: true });
    logAction(`Started toggling ${flagName} visibility`);

    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 300));

    // Toggle the actual flag
    const currentState = flags[showFlag as keyof typeof flags];
    setFlags({
      [showFlag]: !currentState,
      [loadingFlag]: false
    });

    logAction(`${flagName} ${!currentState ? 'shown' : 'hidden'}`);
  };

  const toggleSection = async (sectionName: string) => {
    const showFlag = `is${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}Show`;
    const loadingFlag = `is${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}Loading`;
    const isCurrentlyShown = flags[showFlag as keyof typeof flags];

    // Set loading state
    setFlags({ [loadingFlag]: true });
    logAction(`Started toggling ${sectionName} visibility`);

    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 300));

    // Toggle section and related boxes
    const updates: any = {
      [showFlag]: !isCurrentlyShown,
      [loadingFlag]: false
    };

    // If showing section, show related boxes
    if (!isCurrentlyShown) {
      if (sectionName === 'section1') {
        updates.isBox1Show = true;
        updates.isBox2Show = true;
      } else if (sectionName === 'section2') {
        updates.isBox3Show = true;
        updates.isBox4Show = true;
      }
    } else {
      // If hiding section, hide related boxes
      if (sectionName === 'section1') {
        updates.isBox1Show = false;
        updates.isBox2Show = false;
      } else if (sectionName === 'section2') {
        updates.isBox3Show = false;
        updates.isBox4Show = false;
      }
    }

    setFlags(updates);
    logAction(`${sectionName} ${!isCurrentlyShown ? 'shown' : 'hidden'} with related boxes`);
  };


  return (
    <section id="interactive-example" className="py-20 bg-gray-800 text-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-12">Interactive Example</h2>

        <div className="bg-gray-900 rounded-lg p-8">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-700 mb-8">
            <button
              onClick={() => setActiveTab('demo')}
              className={`px-6 py-3 font-semibold text-lg transition-colors duration-200 border-b-2 ${
                activeTab === 'demo'
                  ? 'text-green-400 border-green-400'
                  : 'text-gray-400 border-transparent hover:text-gray-300'
              }`}
            >
              Live Demo
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-6 py-3 font-semibold text-lg transition-colors duration-200 border-b-2 ${
                activeTab === 'code'
                  ? 'text-green-400 border-green-400'
                  : 'text-gray-400 border-transparent hover:text-gray-300'
              }`}
            >
              Code
            </button>
          </div>

          <div className="flex flex-col gap-8">
            {activeTab === 'demo' && (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                <ToggleButton
                  name="Section 1"
                  isActive={flags.isSection1Show}
                  isLoading={flags.isSection1Loading}
                  onClick={() => toggleSection('section1')}
                  variant="section"
                />
                <ToggleButton
                  name="Section 2"
                  isActive={flags.isSection2Show}
                  isLoading={flags.isSection2Loading}
                  onClick={() => toggleSection('section2')}
                  variant="section"
                />
                <ToggleButton
                  name="Box 1"
                  isActive={flags.isBox1Show}
                  isLoading={flags.isBox1Loading}
                  isDisabled={!flags.isSection1Show}
                  onClick={() => toggleFlag('box1')}
                  variant="box"
                />
                <ToggleButton
                  name="Box 2"
                  isActive={flags.isBox2Show}
                  isLoading={flags.isBox2Loading}
                  isDisabled={!flags.isSection1Show}
                  onClick={() => toggleFlag('box2')}
                  variant="box"
                />
                <ToggleButton
                  name="Box 3"
                  isActive={flags.isBox3Show}
                  isLoading={flags.isBox3Loading}
                  isDisabled={!flags.isSection2Show}
                  onClick={() => toggleFlag('box3')}
                  variant="box"
                />
                <ToggleButton
                  name="Box 4"
                  isActive={flags.isBox4Show}
                  isLoading={flags.isBox4Loading}
                  isDisabled={!flags.isSection2Show}
                  onClick={() => toggleFlag('box4')}
                  variant="box"
                />
                <ToggleButton
                  name="Box 5"
                  isActive={flags.isBox5Show}
                  isLoading={flags.isBox5Loading}
                  onClick={() => toggleFlag('box5')}
                  variant="independent"
                />
                <ToggleButton
                  name="Box 6"
                  isActive={flags.isBox6Show}
                  isLoading={flags.isBox6Loading}
                  onClick={() => toggleFlag('box6')}
                  variant="independent"
                />
              </div>
              <div className='flex flex-col mt-8 gap-4'>
                <DisplaySection
                  title="Section 1"
                  isVisible={flags.isSection1Show}
                  isLoading={flags.isSection1Loading}
                  boxes={[
                    { name: 'Box 1', isVisible: flags.isBox1Show, isLoading: flags.isBox1Loading },
                    { name: 'Box 2', isVisible: flags.isBox2Show, isLoading: flags.isBox2Loading }
                  ]}
                />
                
                <DisplaySection
                  title="Section 2"
                  isVisible={flags.isSection2Show}
                  isLoading={flags.isSection2Loading}
                  boxes={[
                    { name: 'Box 3', isVisible: flags.isBox3Show, isLoading: flags.isBox3Loading },
                    { name: 'Box 4', isVisible: flags.isBox4Show, isLoading: flags.isBox4Loading }
                  ]}
                />
                
                <div className='flex gap-3'>
                  <DisplayBox
                    name="Box 5"
                    isVisible={flags.isBox5Show}
                    isLoading={flags.isBox5Loading}
                    variant="independent"
                  />
                  <DisplayBox
                    name="Box 6"
                    isVisible={flags.isBox6Show}
                    isLoading={flags.isBox6Loading}
                    variant="independent"
                  />
                </div>
              </div>
            </div>
            )}

            {activeTab === 'code' && (
            <div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-green-400">Basic Setup</h4>
                  <CodeBlock code={getCodeTemplate('basicSetup')} />
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-green-400">Toggle Functions</h4>
                  <CodeBlock code={getCodeTemplate('toggleFunctions')} />
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-green-400">Component Usage</h4>
                  <CodeBlock code={getCodeTemplate('componentUsage')} />
                </div>
              </div>
            </div>
            )}

            {activeTab === 'demo' && (
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-green-400">Current State</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <JsonDisplay data={flags} />
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4 text-gray-300 flex items-center gap-2">
                  <div className='w-2 h-2 bg-blue-400 rounded-full animate-pulse'></div>
                  Actions Log
                </h4>
                <div className="bg-gray-800 rounded-lg p-4 max-h-40 overflow-y-auto border border-gray-700">
                  <div className="text-sm text-gray-400 space-y-2">
                    {logEntries.map(entry => (
                      <div key={entry.id} className="flex justify-between items-center py-1 px-2 rounded bg-gray-700/50 hover:bg-gray-700 transition-colors">
                        <span className='text-gray-500 font-mono text-xs'>[{entry.timestamp}]</span>
                        <span className='text-gray-300'>{entry.action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveExample;
