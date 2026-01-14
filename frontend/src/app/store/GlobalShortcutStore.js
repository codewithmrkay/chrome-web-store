import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GlobalShortcutService } from '../services/GlobalShortcutService';

export const useShortcutStore = create(
    persist(
        (set) => ({
            shortcuts: [],
            loading: false,
            error: null,

            // Fetch all shortcuts
            fetchShortcuts: async () => {
                try {
                    set({ loading: true, error: null });

                    const data = await GlobalShortcutService.getAllShortcuts();
                    console.log("fetched global shorcuts ",data)
                    set({ shortcuts: data.Globalshortcuts, loading: false });
                } catch (err) {
                    set({
                        error: err.response?.data?.message || 'Failed to load shortcuts',
                        loading: false
                    });
                }
            }
        })
    )
)