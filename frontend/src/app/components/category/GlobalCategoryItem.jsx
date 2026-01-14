import React from 'react';
import * as LucideIcons from 'lucide-react';

export const GlobalCategoryItem = ({ category, isSelected, onClick }) => {
  // Get icon component dynamically
  const getIcon = (iconName) => {
    const IconComponent = LucideIcons[iconName] || LucideIcons.Grid;
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <button
      onClick={() => onClick(category)}
      className={`
        btn btn-sm gap-1 shrink-0
        ${isSelected 
          ? 'btn-primary' 
          : 'btn-neutral'
        }
      `}
    >
      {getIcon(category.icon)}
      <span className="whitespace-nowrap font-medium">{category.name.toUpperCase()}</span>
    </button>
  );
};