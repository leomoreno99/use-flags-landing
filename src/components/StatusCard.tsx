import React from 'react';

export type StatusCardVariant = 'success' | 'warning' | 'theme';
interface StatusCardProps {
  variant: StatusCardVariant;
  title: string;
  description: string;
  isDarkMode?: boolean;
  additionalContent?: React.ReactNode;
  className?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
  variant,
  title,
  description,
  isDarkMode = false,
  additionalContent,
  className = ""
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          container: 'bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700',
          title: 'text-green-800 dark:text-green-200',
          description: 'text-green-600 dark:text-green-300'
        };
      case 'warning':
        return {
          container: 'bg-yellow-100 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700',
          title: 'text-yellow-800 dark:text-yellow-200',
          description: 'text-yellow-600 dark:text-yellow-300'
        };
      case 'theme':
        return {
          container: `border transition-colors ${isDarkMode
            ? 'bg-gray-900 border-gray-700 text-white'
            : 'bg-white border-gray-300 text-gray-900'
          }`,
          title: 'font-semibold',
          description: ''
        };
      default:
        return {
          container: 'bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700',
          title: 'text-gray-800 dark:text-gray-200',
          description: 'text-gray-600 dark:text-gray-300'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`p-4 rounded-md ${styles.container} ${className}`}>
      <h4 className={`font-semibold ${styles.title}`}>{title}</h4>
      <p className={styles.description}>{description}</p>
      {additionalContent}
    </div>
  );
};

export default StatusCard;
