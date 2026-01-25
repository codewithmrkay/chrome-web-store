import React, { useEffect } from 'react';
import { useShortcutStore } from '../../store/shortcut.store';
import { useCategoryStore } from '../../store/Category.store';
import { UserShortcutItem } from './UserShortcutItem';
import { useNavigate } from 'react-router-dom';

export const UserShortcutGrid = () => {
const navigate = useNavigate();
  const handleExplore = () => {
    navigate('/explore')
  }

    const { loading, error, fetchShortcuts, getFilteredShortcuts } = useShortcutStore();
    const { selectedCategory } = useCategoryStore();
    
    const filteredShortcuts = getFilteredShortcuts();

    useEffect(() => {
        fetchShortcuts();
    }, []);

    // Loading state
    if (loading && filteredShortcuts.length === 0) {
        return (
            <div className="container mx-auto px-4 py-6">
                <h2 className="text-2xl font-bold mb-4">Your Shortcuts</h2>
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

    // Empty state for filtered results
    if (filteredShortcuts.length === 0) {
        return (
            <div className="container mx-auto px-4 py-6">
                <h2 className="text-2xl font-bold mb-4">
                    {selectedCategory} Shortcuts
                </h2>
                <div className="alert alert-info">
                    <span>No shortcuts in "{selectedCategory}" category yet.</span>
                    <button onClick={()=>handleExplore()} className='btn btn-neutral'>Explore</button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-4">
                {selectedCategory} ({filteredShortcuts.length})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filteredShortcuts.map((shortcut) => (
                    <UserShortcutItem
                        key={shortcut._id}
                        shortcut={shortcut}
                    />
                ))}
            </div>
        </div>
    );
};