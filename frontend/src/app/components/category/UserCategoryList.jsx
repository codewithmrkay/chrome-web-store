import React, { useEffect } from 'react';
import { useCategoryStore } from '../../store/Category.store';
import { CategoryItem } from './CategoryItem';
import { X } from 'lucide-react';

export const UserCategoryList = () => {
  const { 
    categories, 
    selectedCategory, 
    loading, 
    error, 
    fetchCategories, 
    setSelectedCategory,
    updateCategory,
    deleteCategory,
    clearError
  } = useCategoryStore();

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, []);

  const handleSelectCategory = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const handleUpdateCategory = async (categoryId, newName) => {
    const success = await updateCategory(categoryId, newName);
    return success;
  };

  const handleDeleteCategory = async (categoryId) => {
    const success = await deleteCategory(categoryId);
    return success;
  };

  if (loading && categories.length === 0) {
    return (
      <div className="w-full max-w-xs">
        <h3 className="text-lg font-bold mb-3">Categories</h3>
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton h-12 w-full rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xs">
      {error && (
        <div className="alert alert-error mb-3">
          <span className="text-sm">{error}</span>
          <button 
            onClick={clearError}
            className="btn btn-xs btn-ghost"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="space-y-1">
        {categories.map((category) => (
          <CategoryItem
            key={category._id}
            category={category}
            isSelected={selectedCategory === category.name}
            onSelect={handleSelectCategory}
            onUpdate={handleUpdateCategory}
            onDelete={handleDeleteCategory}
          />
        ))}
      </div>

      {categories.length === 1 && categories[0]._id === 'all' && (
        <div className="alert alert-info mt-3">
          <span className="text-sm">No categories yet. Create your first one!</span>
        </div>
      )}
    </div>
  );
};