import { create } from 'zustand';
import { getShortcut, updateShortcut, deleteShortcut, createShortcut, addGlobalShortcutToUser } from '../services/shortcut.services';

export const useShortcutStore = create((set, get) => ({
    shortcuts: [],
    loading: false,
    error: null,

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

    createShortcut: async (shortcutData) => {
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

   // Add global shortcut to user's shortcuts
addGlobalShortcutToUser: async (globalShortcutId, userCategoryId) => {
    try {
        set({ loading: true, error: null });

        const response = await addGlobalShortcutToUser(globalShortcutId, userCategoryId);

        // Refresh shortcuts to show changes
        await get().fetchShortcuts();

        set({ loading: false });
        
        // Return response with action type
        return { 
            success: true, 
            action: response.action // 'added' or 'removed'
        };
    } catch (err) {
        console.log(err);
        set({
            error: err.response?.data?.message || 'Failed to add shortcut',
            loading: false
        });
        return { success: false };
    }
},

    // Get shortcuts by category from category store
    getShortcutsByCategory: (selectedCategory) => {
        const { shortcuts } = get();

        if (!selectedCategory || selectedCategory === 'All') {
            return shortcuts;
        }

        return shortcuts.filter(s => 
            s.category?._id === selectedCategory || 
            s.category?.name === selectedCategory
        );
    },

    clearError: () => set({ error: null })
}));