import React, { useEffect } from 'react';
import { useGlobalCategoryStore } from '../../store/GlobalCategory.store';
import { GlobalCategoryItem } from './GlobalCategoryItem';
import { useShortcutStore } from '../../store/GlobalShortcut.store';
import { useNavigate } from 'react-router-dom';


export const GlobalCategoryGrid = () => {
  const navigate = useNavigate();
  const handleExplore = () => {
    navigate('/')
  }

  const { categories, selectedCategory, loading, error, fetchCategories, setSelectedCategory } = useGlobalCategoryStore();
  const { setCategory } = useShortcutStore();

  // Fetch categories on mount
  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, []);

  // Handle category click
  const handleCategoryClick = (category) => {
    setCategory(category.name.toLowerCase())
    setSelectedCategory(category.name);
    // Add your filter logic here
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-base-100  h-fit w-full max-w-6xl">
        <div>
          <div className="flex flex-wrap mr-auto w-full max-w-6xl gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <div key={i} className="skeleton h-8 w-24 shrink-0 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-base-100 shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="alert alert-error">
            <span>{error}</span>
            <button onClick={fetchCategories} className="btn btn-sm">
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-100 shadow-xl sticky top-0 z-10">
      <div className="container">
        <div className="flex items-center gap-2">
          {/* Categories Grid Container */}
          <div
            className="flex flex-wrap gap-2 overflow-x-auto scroll-smooth scrollbar-hide flex-1"
          >
            {categories.map((category) => (
              <GlobalCategoryItem
                key={category._id}
                category={category}
                isSelected={selectedCategory === category.name}
                onClick={handleCategoryClick}
              />
            ))}
            <button onClick={() => handleExplore()} className='btn btn-sm btn-secondary'>Go To MyShortCuts</button>
          </div>
        </div>
      </div>
    </div>
  );
};