import {create} from "zustand"
import { getGlobalCateGories } from "../services/globalCategory.servicesApi";

export const useGlobalCategoryStore = create((set) => ({
  categories: [],
  selectedCategory: 'All',
  loading: false,
  error: null,

  fetchCategories: async () => {
    try {
      set({ loading: true, error: null });

      const data = await getGlobalCateGories();
      const allCategories = [
        { _id: 'all', name: 'All', icon: 'Grid' },
        ...data.result
      ];

      set({ categories: allCategories, loading: false });
    } catch (err) {
      set({ 
        error: err.response?.data?.message || 'Failed to load Categories',
        loading: false 
      });
    }
  },

  setSelectedCategory: (categoryName) => {
    set({ selectedCategory: categoryName });
  },
}));


