export const codeTemplates = {
  basicExample: `import { useFlagsState } from 'use-flags-state';

  const { flags, setFlags, setFlag } = useFlagsState({
    isLoading: false,
    isError: false,
    isSuccess: false,
  });

  const handleClick = async () => {
    setFlags({ isLoading: true });
    try {
      const response = await fetch('/api/endpoint');
      setFlags({ isLoading: false, isSuccess: true });
    } catch (error) {
      setFlags({ isLoading: false, isError: true });
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      {flags.isLoading && <div>Loading...</div>}
      {flags.isError && <div>Error!</div>}
      {flags.isSuccess && <div>Success!</div>}
    </div>
);`,
  basicSetup: `import { useFlagsState } from 'use-flags-state';

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
}, false);`,

  toggleFunctions: `const toggleFlag = async (flagName: string) => {
  const showFlag = \`is\${flagName.charAt(0).toUpperCase() + flagName.slice(1)}Show\`;
  const loadingFlag = \`is\${flagName.charAt(0).toUpperCase() + flagName.slice(1)}Loading\`;

  // Set loading state
  setFlags({ [loadingFlag]: true });
  
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 300));

  // Toggle the actual flag
  const currentState = flags[showFlag as keyof typeof flags];
  setFlags({
    [showFlag]: !currentState,
    [loadingFlag]: false
  });
};

const toggleSection = async (sectionName: string) => {
  const showFlag = \`is\${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}Show\`;
  const loadingFlag = \`is\${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}Loading\`;
  const isCurrentlyShown = flags[showFlag as keyof typeof flags];

  // Set loading state
  setFlags({ [loadingFlag]: true });
  
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
};`,

  componentUsage: `// Toggle buttons with loading states
<ToggleButton
  name="Section 1"
  isActive={flags.isSection1Show}
  isLoading={flags.isSection1Loading}
  onClick={() => toggleSection('section1')}
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

// Conditional rendering based on flags
{flags.isSection1Show && (
  <div className="section">
    <h3>Section 1 Content</h3>
    {flags.isBox1Show && <div>Box 1 Content</div>}
    {flags.isBox2Show && <div>Box 2 Content</div>}
  </div>
)}

// Loading states
{flags.isSection1Loading && (
  <div className="loading">Loading Section 1...</div>
)}`
};

export const getCodeTemplate = (templateName: keyof typeof codeTemplates): string => {
  return codeTemplates[templateName];
};
