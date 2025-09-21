import React, { useState } from 'react';
import { useFlagsState } from 'use-flags-state';
import ToggleButton from './ToggleButton';
import DisplaySection from './DisplaySection';
import DisplayBox from './DisplayBox';
import JsonDisplay from './JsonDisplay';
import CodeBlock from './CodeBlock';
import { getCodeTemplate } from '../utils/codeTemplates';
import Subtitle from './Subtitle';
import TabbedContainer from './TabbedContainer';
import ActionLog, { type LogEntry } from './ActionLog';

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
    <section id="interactive-example">
      <div>
        <Subtitle text="Interactive Example" />

        <TabbedContainer
          className="border border-custom-gray p-4 rounded-[6px] my-6"
          style={{ background: 'linear-gradient(180deg, #222222 0%, #1A1A1A 100%)' }}
          demoContent={
            <>
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
              <div>
                <h3 className="text-base font-semibold mb-4">Current State</h3>
                <div className="bg-neutral-800 rounded-lg p-4">
                  <JsonDisplay data={flags} />
                </div>

                <ActionLog data={logEntries} />
              </div>
            </>
          }
          codeContent={
            <div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-semibold mb-4 text-white">Basic Setup</h4>
                  <CodeBlock code={getCodeTemplate('basicSetup')} />
                </div>

                <div>
                  <h4 className="text-base font-semibold mb-4 text-white">Toggle Functions</h4>
                  <CodeBlock code={getCodeTemplate('toggleFunctions')} />
                </div>

                <div>
                  <h4 className="text-base font-semibold mb-4 text-white">Component Usage</h4>
                  <CodeBlock code={getCodeTemplate('componentUsage')} />
                </div>
              </div>
            </div>
          }
        />
      </div>
    </section>
  );
};

export default InteractiveExample;
