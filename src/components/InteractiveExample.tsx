import React, { useState } from 'react';
import type { Flags, LogEntry } from '../types';

const InteractiveExample: React.FC = () => {
  const [flags, setFlags] = useState<Flags>({
    isLoading: false,
    isSuccess: false,
    isError: false
  });

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

  const updateFlags = (newFlags: Partial<Flags>) => {
    setFlags(prev => ({ ...prev, ...newFlags }));
    logAction(`setFlags(${JSON.stringify(newFlags)})`);
  };

  const resetFlags = () => {
    setFlags({ isLoading: false, isSuccess: false, isError: false });
    logAction('resetFlags()');
  };

  const simulateLoading = () => {
    updateFlags({ isLoading: true, isSuccess: false, isError: false });
    
    // Simulate async operation
    setTimeout(() => {
      updateFlags({ isLoading: false, isSuccess: true });
    }, 2000);
  };

  const simulateSuccess = () => {
    updateFlags({ isLoading: false, isSuccess: true, isError: false });
  };

  const simulateError = () => {
    updateFlags({ isLoading: false, isSuccess: false, isError: true });
  };

  return (
    <section id="interactive-example" className="py-20 bg-gray-800 text-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-12">Interactive Example</h2>
        
        <div className="bg-gray-900 rounded-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-green-400">Live Demo</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span 
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      flags.isLoading ? 'bg-blue-500' : 'bg-gray-600'
                    }`}
                  />
                  <span className="text-gray-300">
                    Loading: <span className="font-mono">{flags.isLoading.toString()}</span>
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span 
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      flags.isSuccess ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  />
                  <span className="text-gray-300">
                    Success: <span className="font-mono">{flags.isSuccess.toString()}</span>
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span 
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      flags.isError ? 'bg-red-500' : 'bg-gray-600'
                    }`}
                  />
                  <span className="text-gray-300">
                    Error: <span className="font-mono">{flags.isError.toString()}</span>
                  </span>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <button 
                  onClick={simulateLoading}
                  disabled={flags.isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
                >
                  {flags.isLoading ? 'Loading...' : 'Simulate Loading'}
                </button>
                
                <button 
                  onClick={simulateSuccess}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
                >
                  Simulate Success
                </button>
                
                <button 
                  onClick={simulateError}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
                >
                  Simulate Error
                </button>
                
                <button 
                  onClick={resetFlags}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
                >
                  Reset Flags
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-green-400">Current State</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <pre className="text-sm text-gray-300 font-mono">
                  {JSON.stringify(flags, null, 2)}
                </pre>
              </div>
              
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-3 text-gray-300">Actions Log</h4>
                <div className="bg-gray-800 rounded-lg p-4 max-h-32 overflow-y-auto">
                  <div className="text-sm text-gray-400 space-y-1">
                    {logEntries.map(entry => (
                      <div key={entry.id} className="flex justify-between">
                        <span>[{entry.timestamp}]</span>
                        <span>{entry.action}</span>
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
