import { useState } from 'react';
import { Trash2 } from "lucide-react";
import { useShortcutStore } from '../../store/shortcut.store';
import toast from 'react-hot-toast';

export const DeleteShortcutModal = ({ shortcutId, shortcutTitle }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteShortcut } = useShortcutStore();

  const handleConfirm = async () => {
    setIsDeleting(true);
    
    const success = await deleteShortcut(shortcutId);
    
    if (success) {
      toast.success(`"${shortcutTitle}" deleted successfully!`);
      document.getElementById(`delete_shortcut_modal_${shortcutId}`).close();
    } else {
      toast.error('Failed to delete shortcut');
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    document.getElementById(`delete_shortcut_modal_${shortcutId}`).close();
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById(`delete_shortcut_modal_${shortcutId}`).showModal();
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="btn btn-error btn-xs gap-1"
        title="Delete"
        disabled={isDeleting}
      >
        {isDeleting ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          <>
            <Trash2 className="w-3 h-3" />
            Delete
          </>
        )}
      </button>

      <dialog id={`delete_shortcut_modal_${shortcutId}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Shortcut</h3>
          <p className="py-4">
            Are you sure you want to delete <strong>"{shortcutTitle}"</strong>?
          </p>
          <div className="modal-action">
            <button
              onClick={handleConfirm}
              className="btn btn-error"
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
            <button onClick={handleClose} className="btn btn-neutral">
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};