// Component-specific types for better type safety

export interface FlagState extends Record<string, boolean> {
  isSection1Show: boolean;
  isSection2Show: boolean;
  isBox1Show: boolean;
  isBox2Show: boolean;
  isBox3Show: boolean;
  isBox4Show: boolean;
  isBox5Show: boolean;
  isBox6Show: boolean;
  isSection1Loading: boolean;
  isSection2Loading: boolean;
  isBox1Loading: boolean;
  isBox2Loading: boolean;
  isBox3Loading: boolean;
  isBox4Loading: boolean;
  isBox5Loading: boolean;
  isBox6Loading: boolean;
}

export interface ButtonConfig {
  name: string;
  action: () => void;
  isActive: boolean;
  isLoading: boolean;
  variant: 'section' | 'box' | 'independent';
}

export interface SectionConfig {
  title: string;
  isVisible: boolean;
  isLoading: boolean;
  boxes: Array<{
    name: string;
    isVisible: boolean;
    isLoading: boolean;
  }>;
}

export interface IndependentBoxConfig {
  name: string;
  isVisible: boolean;
  isLoading: boolean;
}
