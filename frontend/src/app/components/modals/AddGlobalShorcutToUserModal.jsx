import React, { useState } from 'react';
import { Plus, Check, Trash2 } from 'lucide-react';
import { useCategoryStore } from '../../store/Category.store';
import { useShortcutStore } from '../../store/shortcut.store';
import toast from 'react-hot-toast';

export const AddGlobalShortcutToUserModal = ({ globalShortcutId, shortcutTitle, isAdded }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [error, setError] = useState('');
  
  const { categories } = useCategoryStore();
  const { addGlobalShortcutToUser, loading, shortcuts } = useShortcutStore();

  const userCategories = categories.filter(cat => cat._id !== 'all');

  // Find which category this shortcut is in
  const existingShortcut = shortcuts.find(s => s.globalShortcutId === globalShortcutId);

  const handleOpenModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById(`add_global_modal_${globalShortcutId}`).showModal();
  };

  const handleCategoryChange = (e) => {
    setSelectedCategoryId(e.target.value);
    if (error) setError('');
  };

  const handleConfirmAdd = async () => {
    if (!selectedCategoryId) {
      setError('Please select a category');
      return;
    }

    const result = await addGlobalShortcutToUser(globalShortcutId, selectedCategoryId);

    if (result.success) {
      if (result.action === 'added') {
        toast.success(`"${shortcutTitle}" added to your shortcuts!`);
      } else if (result.action === 'removed') {
        toast.error(`"${shortcutTitle}" removed from your shortcuts!`);
      }
      handleClose();
    } else {
      toast.error('Failed to process shortcut');
    }
  };

  const handleRemove = async () => {
    // Use the existing shortcut's category to remove it
    const result = await addGlobalShortcutToUser(globalShortcutId, existingShortcut.category._id);

    if (result.success && result.action === 'removed') {
      toast.success(`"${shortcutTitle}" removed from your shortcuts!`);
      handleClose();
    } else {
      toast.error('Failed to remove shortcut');
    }
  };

  const handleClose = () => {
    setSelectedCategoryId('');
    setError('');
    document.getElementById(`add_global_modal_${globalShortcutId}`).close();
  };

  return (
    <>
      <button 
        onClick={handleOpenModal}
        className={`btn btn-xs gap-1 ${isAdded ? 'btn-success' : 'btn-primary'}`}
      >
        {isAdded ? (
          <>
            <Check className="w-3 h-3" />
            Added
          </>
        ) : (
          <>
            <Plus className="w-3 h-3" />
            Add
          </>
        )}
      </button>

      <dialog id={`add_global_modal_${globalShortcutId}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            {isAdded ? 'Remove Shortcut' : 'Add to Your Shortcuts'}
          </h3>

          <div className="bg-base-200 p-3 rounded-lg mb-4">
            <p className="text-sm font-medium">{shortcutTitle}</p>
          </div>

          {isAdded ? (
            // Already added - show remove option
            <>
              <div className="alert alert-warning mb-4">
                <div>
                  <p className="font-semibold">Already Added</p>
                  <p className="text-sm">
                    This shortcut is already in your <strong>"{existingShortcut?.category?.name}"</strong> category.
                  </p>
                </div>
              </div>

              <div className="modal-action">
                <button
                  onClick={handleRemove}
                  disabled={loading}
                  className="btn btn-error gap-2"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Removing...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </>
                  )}
                </button>
                <button
                  onClick={handleClose}
                  className="btn btn-neutral"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            // Not added - show category selection
            <>
              <div className='w-full'>
                <label className="label">
                  <span className="label-text">Choose Category</span>
                </label>
                <select
                  value={selectedCategoryId}
                  onChange={handleCategoryChange}
                  className={`select select-bordered w-full ${error ? 'select-error' : ''}`}
                >
                  <option value="">Select a category...</option>
                  {userCategories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {error && (
                  <label className="label">
                    <span className="label-text-alt text-error">{error}</span>
                  </label>
                )}
              </div>

              <div className="modal-action">
                <button
                  onClick={handleConfirmAdd}
                  disabled={loading}
                  className="btn btn-primary"
                >
                  {loading ? 'Adding...' : 'Add Shortcut'}
                </button>
                <button
                  onClick={handleClose}
                  className="btn btn-neutral"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </dialog>
    </>
  );
};