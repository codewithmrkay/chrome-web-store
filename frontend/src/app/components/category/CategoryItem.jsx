import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { ChangeCategoryNameModal } from '../modals/ChangeCategoryNameModal';
import { DeleteConfirmModal } from '../modals/DeleteConfirmModal';

export const CategoryItem = ({ category, isSelected, onSelect, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (categoryId) => {
    setIsDeleting(true);
    await onDelete(categoryId);
    setIsDeleting(false);
  };

  const isAllCategory = category._id === 'all';

  return (
    <div className={`
      flex items-center gap-2 p-2 px-3 rounded-lg transition-all duration-200
      ${isSelected
        ? 'bg-primary text-primary-content'
        : 'bg-base-100 hover:bg-base-200'
      }
      ${isDeleting ? 'opacity-50' : ''}
    `}>

      <button
        onClick={() => onSelect(category.name)}
        className="cursor-pointer flex-1 text-left font-medium text-sm"
        disabled={isDeleting}
      >
        {category.name.toUpperCase()}
      </button>

      {!isAllCategory && (
        <div className="flex gap-1 items-center justify-center">
          <ChangeCategoryNameModal
            categoryId={category._id}
            currentName={category.name}
          />

          <DeleteConfirmModal
            categoryId={category._id}
            categoryName={category.name}
            onConfirm={handleDelete}
            isDeleting={isDeleting}
          />
        </div>
      )}
    </div>
  );
};