import { Trash2 } from "lucide-react";

export const DeleteConfirmModal = ({ categoryId, categoryName, onConfirm, isDeleting }) => {
  const handleConfirm = () => {
    onConfirm(categoryId);
    document.getElementById(`delete_modal_${categoryId}`).close();
  };

  const handleClose = () => {
    document.getElementById(`delete_modal_${categoryId}`).close();
  };

  return (
    <>
      <button
        onClick={() => document.getElementById(`delete_modal_${categoryId}`).showModal()}
        className="btn btn-xs btn-ghost text-error"
        title="Delete"
        disabled={isDeleting}
      >
        {isDeleting ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          <Trash2 className="w-3 h-3" />
        )}
      </button>

      <dialog id={`delete_modal_${categoryId}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Category</h3>
          <p className="py-4">
            Are you sure you want to delete <strong>"{categoryName}"</strong>?
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