import React, { useEffect } from 'react';
import { useShortcutStore } from '../../store/GlobalShortcut.store';
import { GlobalShortcutItem } from './GlobalShortcutItem';

export const GlobalShortcutGrid = () => {
    const { loading, error, fetchShortcuts, shortcuts, selectedCategory } = useShortcutStore();
    const filteredShortcuts = shortcuts.filter(s => 
        selectedCategory === 'all' ? true : s.category?.name === selectedCategory
    );
    useEffect(() => {
        if (shortcuts.length === 0) {
            fetchShortcuts();
        }
    }, []);

    // Loading state
    if (loading) {
        return (
            <div className="container mx-auto px-4 py-6">
                <h2 className="text-2xl font-bold mb-4">Quick Shortcuts</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="card bg-base-100 shadow-md">
                            <div className="card-body p-4 items-center">
                                <div className="skeleton w-16 h-16 rounded-lg"></div>
                                <div className="skeleton h-4 w-20 mt-3"></div>
                                <div className="skeleton h-6 w-full mt-2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="container mx-auto px-4 py-6">
                <div className="alert alert-error">
                    <span>{error}</span>
                    <button onClick={fetchShortcuts} className="btn btn-sm">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // Empty state
    if (shortcuts.length === 0) {
        return (
            <div className="container mx-auto px-4 py-6">
                <h2 className="text-2xl font-bold mb-4">Quick Shortcuts</h2>
                <div className="alert alert-info">
                    <span>No shortcuts available yet.</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filteredShortcuts.map((shortcut) => (
                    <GlobalShortcutItem
                        key={shortcut._id}
                        shortcut={shortcut}
                    />
                ))}

            </div>
        </div>
    );
};