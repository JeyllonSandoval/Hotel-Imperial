import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle, 
  className = "" 
}) => {
  return (
    <div className={`text-center mb-16 ${className}`}>
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
        {title}
      </h2>
      <p className="text-lg text-gray-300 max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
};
