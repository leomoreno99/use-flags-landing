import React from 'react';

interface ButtonProps {
  name?: string;
  href?: string;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ 
  name = 'Button', 
  href = '', 
  className = '',
  onClick 
}) => {
  const baseClasses = `bg-white hover:bg-gray-100 text-black font-semibold py-3 px-4 rounded-md transition-colors duration-200 ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} inline-block`}
      >
        {name}
      </a>
    );
  }

  return (
    <button
      className={baseClasses}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
