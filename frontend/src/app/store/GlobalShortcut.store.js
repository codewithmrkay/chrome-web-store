import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GlobalShortcutService } from "../services/globalShorcut.services"
export const useShortcutStore = create(
    persist(
        (set, get) => ({
            shortcuts: [],
            loading: false,
            error: null,
            selectedCategory: 'all',
            setCategory: (categoryName) => set({ selectedCategory: categoryName }),

            getFilteredShortcuts: () => {
                const { shortcuts, selectedCategory } = get();
                if (selectedCategory === 'all') return shortcuts;
                return shortcuts.filter(s => s.category?.name === selectedCategory);
            },
            fetchShortcuts: async () => {
                try {
                    set({ loading: true, error: null });

                    const data = await GlobalShortcutService.getAllShortcuts();

                    set({ shortcuts: data.Globalshortcuts, loading: false });
                } catch (err) {
                    set({
                        error: err.response?.data?.message || 'Failed to load shortcuts',
                        loading: false
                    });
                }
            }
        }),
        {
            name: 'shortcut-storage',
            partialize: (state) => ({
                shortcuts: state.shortcuts,
            })
        }
    )
)