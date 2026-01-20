import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getCateGories, updateCateGories, deleteCateGories, createCateGories } from '../services/Category.services';

export const useCategoryStore = create(
  persist(
    (set, get) => ({
      categories: [],
      selectedCategory: 'All',
      loading: false,
      error: null,

      addCategory: async (categoryName) => {
        try {
          set({ loading: true, error: null });

          const response = await createCateGories({ name: categoryName });

          await get().fetchCategories();

          return { success: true, data: response.data };
        } catch (err) {
          set({
            error: err.response?.data?.message || 'Failed to create category',
            loading: false
          });
          return { success: false, error: err };
        }
      },

      fetchCategories: async () => {
        try {
          set({ loading: true, error: null });

          const data = await getCateGories();
          const allCategories = [
            { _id: 'all', name: 'All' },
            ...data.categories
          ];

          set({ categories: allCategories, loading: false });
        } catch (err) {
          console.log(err)
          set({
            error: err.response?.data?.message || 'Failed to load Categories',
            loading: false
          });
        }
      },

      setSelectedCategory: (categoryName) => {
        set({ selectedCategory: categoryName });
      },

      updateCategory: async (categoryId, newName) => {
        try {
          set({ error: null });

          const oldCategories = get().categories;
          set({
            categories: oldCategories.map(cat =>
              cat._id === categoryId ? { ...cat, name: newName } : cat
            )
          });

          await updateCateGories(categoryId, { name: newName });

          await get().fetchCategories();

          return true;
        } catch (err) {
          await get().fetchCategories();
          set({
            error: err.response?.data?.message || 'Failed to update category'
          });
          return false;
        }
      },

      deleteCategory: async (categoryId) => {
        try {
          set({ error: null });

          const oldCategories = get().categories;
          const deletedCategory = oldCategories.find(cat => cat._id === categoryId);

          set({
            categories: oldCategories.filter(cat => cat._id !== categoryId)
          });

          if (get().selectedCategory === deletedCategory?.name) {
            set({ selectedCategory: 'All' });
          }

          await deleteCateGories(categoryId);

          await get().fetchCategories();

          return true;
        } catch (err) {
          await get().fetchCategories();

          set({
            error: err.response?.data?.message || 'Failed to delete category'
          });
          return false;
        }
      },

      clearError: () => set({ error: null })
    }),
    {
      name: 'category-storage',
      partialize: (state) => ({
        selectedCategory: state.selectedCategory
      })
    }
  )
);