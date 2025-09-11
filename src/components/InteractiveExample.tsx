import React, { useState } from 'react';
import type { LogEntry } from '../types';
import type { ButtonConfig, SectionConfig, IndependentBoxConfig } from '../types/components';
import { useFlagManager } from '../hooks/useFlagManager';
import ToggleButton from './ToggleButton';
import DisplaySection from './DisplaySection';
import DisplayBox from './DisplayBox';
import JsonDisplay from './JsonDisplay';

const InteractiveExample: React.FC = () => {
  const { flags, toggleFlag, toggleSection } = useFlagManager();

  const [logEntries, setLogEntries] = useState<LogEntry[]>([
    { id: 1, timestamp: new Date().toLocaleTimeString(), action: 'Initial state loaded' }
  ]);

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

  // Configuration arrays for cleaner rendering
  const buttonConfigs: ButtonConfig[] = [
    {
      name: 'Section 1',
      action: () => toggleSection('section1', logAction),
      isActive: flags.isSection1Show,
      isLoading: flags.isSection1Loading,
      variant: 'section'
    },
    {
      name: 'Section 2',
      action: () => toggleSection('section2', logAction),
      isActive: flags.isSection2Show,
      isLoading: flags.isSection2Loading,
      variant: 'section'
    },
    {
      name: 'Box 1',
      action: () => toggleFlag('box1', logAction),
      isActive: flags.isBox1Show,
      isLoading: flags.isBox1Loading,
      variant: 'box'
    },
    {
      name: 'Box 2',
      action: () => toggleFlag('box2', logAction),
      isActive: flags.isBox2Show,
      isLoading: flags.isBox2Loading,
      variant: 'box'
    },
    {
      name: 'Box 3',
      action: () => toggleFlag('box3', logAction),
      isActive: flags.isBox3Show,
      isLoading: flags.isBox3Loading,
      variant: 'box'
    },
    {
      name: 'Box 4',
      action: () => toggleFlag('box4', logAction),
      isActive: flags.isBox4Show,
      isLoading: flags.isBox4Loading,
      variant: 'box'
    },
    {
      name: 'Box 5',
      action: () => toggleFlag('box5', logAction),
      isActive: flags.isBox5Show,
      isLoading: flags.isBox5Loading,
      variant: 'independent'
    },
    {
      name: 'Box 6',
      action: () => toggleFlag('box6', logAction),
      isActive: flags.isBox6Show,
      isLoading: flags.isBox6Loading,
      variant: 'independent'
    }
  ];

  const sectionConfigs: SectionConfig[] = [
    {
      title: 'Section 1',
      isVisible: flags.isSection1Show,
      isLoading: flags.isSection1Loading,
      boxes: [
        { name: 'Box 1', isVisible: flags.isBox1Show, isLoading: flags.isBox1Loading },
        { name: 'Box 2', isVisible: flags.isBox2Show, isLoading: flags.isBox2Loading }
      ]
    },
    {
      title: 'Section 2',
      isVisible: flags.isSection2Show,
      isLoading: flags.isSection2Loading,
      boxes: [
        { name: 'Box 3', isVisible: flags.isBox3Show, isLoading: flags.isBox3Loading },
        { name: 'Box 4', isVisible: flags.isBox4Show, isLoading: flags.isBox4Loading }
      ]
    }
  ];

  const independentBoxes: IndependentBoxConfig[] = [
    { name: 'Box 5', isVisible: flags.isBox5Show, isLoading: flags.isBox5Loading },
    { name: 'Box 6', isVisible: flags.isBox6Show, isLoading: flags.isBox6Loading }
  ];

  return (
    <section id="interactive-example" className="py-20 bg-gray-800 text-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-12">Interactive Example</h2>

        <div className="bg-gray-900 rounded-lg p-8">
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-green-400">Live Demo</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                {buttonConfigs.map((config, index) => (
                  <ToggleButton
                    key={index}
                    name={config.name}
                    isActive={config.isActive}
                    isLoading={config.isLoading}
                    onClick={config.action}
                    variant={config.variant}
                  />
                ))}
              </div>
              <div className='flex flex-col mt-8 gap-4'>
                {sectionConfigs.map((section, index) => (
                  <DisplaySection
                    key={index}
                    title={section.title}
                    isVisible={section.isVisible}
                    isLoading={section.isLoading}
                    boxes={section.boxes}
                  />
                ))}
                
                <div className='flex gap-3'>
                  {independentBoxes.map((box, index) => (
                    <DisplayBox
                      key={index}
                      name={box.name}
                      isVisible={box.isVisible}
                      isLoading={box.isLoading}
                      variant="independent"
                    />
                  ))}
                </div>
              </div>
            </div>

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
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveExample;
