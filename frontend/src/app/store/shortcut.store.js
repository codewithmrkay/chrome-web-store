import { create } from 'zustand';
import { getShortcut, updateShortcut, deleteShortcut, createShortcut } from '../services/shortcut.services';

export const useShortcutStore = create((set, get) => ({
    shortcuts: [],
    selectedCategory: 'All', // Add selected category state
    loading: false,
    error: null,

    // Set selected category
    setSelectedCategory: (categoryName) => {
        set({ selectedCategory: categoryName });
    },

    // Fetch all shortcuts
    fetchShortcuts: async () => {
        try {
            set({ loading: true, error: null });

            const data = await getShortcut();

            set({ shortcuts: data.result || data, loading: false });
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Failed to load shortcuts',
                loading: false
            });
        }
    },

    // Create shortcut
    createShortcut: async (shortcutData) => {
        console.log(shortcutData)
        try {
            set({ loading: true, error: null });

            const payload = {
                title: shortcutData.name,
                url: shortcutData.url,
                categoryId: shortcutData.categoryId
            };

            await createShortcut(payload);
            await get().fetchShortcuts();

            set({ loading: false });
            return true;
        } catch (err) {
            set({
                error: err.response?.data?.error || 'Failed to create shortcut',
                loading: false
            });
            return false;
        }
    },

    // Update shortcut
    updateShortcut: async (shortcutId, updateData) => {
        try {
            set({ error: null });

            const oldShortcuts = get().shortcuts;
            set({
                shortcuts: oldShortcuts.map(s =>
                    s._id === shortcutId ? { ...s, ...updateData } : s
                )
            });

            await updateShortcut(shortcutId, updateData);
            await get().fetchShortcuts();

            return true;
        } catch (err) {
            await get().fetchShortcuts();

            set({
                error: err.response?.data?.message || 'Failed to update shortcut'
            });
            return false;
        }
    },

    // Delete shortcut
    deleteShortcut: async (shortcutId) => {
        try {
            set({ error: null });

            const oldShortcuts = get().shortcuts;
            set({
                shortcuts: oldShortcuts.filter(s => s._id !== shortcutId)
            });

            await deleteShortcut(shortcutId);
            await get().fetchShortcuts();

            return true;
        } catch (err) {
            await get().fetchShortcuts();

            set({
                error: err.response?.data?.message || 'Failed to delete shortcut'
            });
            return false;
        }
    },

    // Get filtered shortcuts by selected category
    getFilteredShortcuts: () => {
        const { shortcuts, selectedCategory } = get();

        if (selectedCategory === 'All') {
            return shortcuts;
        }

        return shortcuts.filter(s => s.category?._id === selectedCategory || s.category?.name === selectedCategory);
    },

    // Clear error
    clearError: () => set({ error: null })
}));