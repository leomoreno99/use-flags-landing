import { useFlagsState } from 'use-flags-state';
import type { FlagState } from '../types/components';

export const useFlagManager = () => {
  const { flags, setFlags } = useFlagsState<FlagState>({
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

  const toggleFlag = async (flagName: string, logAction: (action: string) => void) => {
    const showFlag = `is${flagName.charAt(0).toUpperCase() + flagName.slice(1)}Show` as keyof FlagState;
    const loadingFlag = `is${flagName.charAt(0).toUpperCase() + flagName.slice(1)}Loading` as keyof FlagState;

    setFlags({ [loadingFlag]: true });
    logAction(`Started toggling ${flagName} visibility`);

    await new Promise(resolve => setTimeout(resolve, 800));

    const currentState = flags[showFlag];
    setFlags({
      [showFlag]: !currentState,
      [loadingFlag]: false
    });

    logAction(`${flagName} ${!currentState ? 'shown' : 'hidden'}`);
  };

  const toggleSection = async (sectionName: string, logAction: (action: string) => void) => {
    const showFlag = `is${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}Show` as keyof FlagState;
    const loadingFlag = `is${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}Loading` as keyof FlagState;
    const isCurrentlyShown = flags[showFlag];

    setFlags({ [loadingFlag]: true });
    logAction(`Started toggling ${sectionName} visibility`);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const updates: Partial<FlagState> = {
      [showFlag]: !isCurrentlyShown,
      [loadingFlag]: false
    };

    // Handle related boxes
    if (!isCurrentlyShown) {
      if (sectionName === 'section1') {
        updates.isBox1Show = true;
        updates.isBox2Show = true;
      } else if (sectionName === 'section2') {
        updates.isBox3Show = true;
        updates.isBox4Show = true;
      }
    } else {
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

  return {
    flags,
    toggleFlag,
    toggleSection
  };
};
