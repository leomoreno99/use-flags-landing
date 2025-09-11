// Centralized types for the useFlags landing page

export interface LogEntry {
  id: number;
  timestamp: string;
  action: string;
}

export interface CopyButtonProps {
  text: string;
  className?: string;
}

export interface CodeBlockProps {
  code: string;
  language?: string;
  showCopyButton?: boolean;
  className?: string;
}
