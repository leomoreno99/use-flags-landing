import React from 'react';

interface SubtitleProps {
  text?: string;
}

const Subtitle: React.FC<SubtitleProps> = ({ text = 'Subtitle' }) => {
  return <h2 className="text-xl">{text}</h2>;
};

export default Subtitle;
