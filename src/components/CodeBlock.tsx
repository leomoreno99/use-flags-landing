import React from 'react';
import { Highlight, themes, type PrismTheme } from 'prism-react-renderer';
import CopyButton from './CopyButton';
import type { CodeBlockProps } from '../types';

// Tema personalizado para fondo negro con matices desde blanco hacia grises
const darkTheme: PrismTheme = {
  plain: {
    color: '#FFFFFF', // Blanco para texto principal
  },
  styles: [
    {
      types: ['comment'],
      style: {
        color: '#9CA3AF', // Gris claro para comentarios
        fontStyle: 'italic' as const,
      },
    },
    {
      types: ['atrule', 'keyword', 'attr-name', 'selector'],
      style: {
        color: '#D1D5DB', // Gris más claro para palabras clave
        fontWeight: 'bold',
      },
    },
    {
      types: ['string', 'char'],
      style: {
        color: '#E5E7EB', // Gris muy claro para strings
      },
    },
    {
      types: ['punctuation', 'operator'],
      style: {
        color: '#9CA3AF', // Gris claro para puntuación
      },
    },
    {
      types: ['class-name', 'function', 'tag'],
      style: {
        color: '#FFFFFF', // Blanco para nombres de clase y funciones
        fontWeight: 'bold',
      },
    },
    {
      types: ['number', 'boolean'],
      style: {
        color: '#D1D5DB', // Gris claro para números y booleanos
      },
    },
    {
      types: ['property', 'variable'],
      style: {
        color: '#E5E7EB', // Gris muy claro para propiedades
      },
    },
  ],
};

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  showCopyButton = true,
  className = ""
}) => {
  return (
    <div
      className={`border border-custom-gray p-4 rounded-[6px] ${className}`}
      style={{ background: 'linear-gradient(180deg, #222222 0%, #1A1A1A 100%)' }}
    >
      {showCopyButton && (
        <div className="flex justify-end items-center mb-3">
          <CopyButton text={code} />
        </div>
      )}

      <Highlight theme={darkTheme} code={code} language="tsx">
        {({ className, tokens, getLineProps, getTokenProps }) => (
          <pre 
            className={`${className} roboto-mono overflow-auto custom-scrollbar`}
            style={{
              scrollbarColor: '#4B5563 #1F2937',
              fontSize: '16px',
              fontFamily: 'var(--font-mono, "Roboto Mono", monospace)',
            }}
          >
            {tokens.map((line, i) => {
              const { key: lineKey, ...rest } = getLineProps({ line, key: i });
              return (
                <div key={lineKey as React.Key} {...rest}>
                  {line.map((token, key) => {
                    const { key: tokenKey, ...rest } = getTokenProps({ token, key });
                    return <span key={tokenKey as React.Key} {...rest} />;
                  })}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-scrollbar::-webkit-scrollbar {
            width: 16px;
            height: 16px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #1F2937;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #4B5563;
            border-radius: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #6B7280;
          }
        `
      }} />
    </div>
  );
};

export default CodeBlock;
