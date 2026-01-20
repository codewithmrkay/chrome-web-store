import { useState, useEffect } from 'react';
import { Pen } from 'lucide-react';
import { useCategoryStore } from '../../store/Category.store';

export const ChangeCategoryNameModal = ({ categoryId, currentName }) => {
    const [categoryName, setCategoryName] = useState('');
    const [error, setError] = useState('');
    const { updateCategory, loading } = useCategoryStore();

    useEffect(() => {
        if (currentName) {
            setCategoryName(currentName);
        }
    }, [currentName]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!categoryName.trim()) {
            setError('Category name is required');
            return;
        }

        if (categoryName.length > 50) {
            setError('Category name must be 50 characters or less');
            return;
        }

        if (categoryName.trim() === currentName) {
            setError('Please enter a different name');
            return;
        }

        const success = await updateCategory(categoryId, categoryName.trim());

        if (success) {
            document.getElementById(`update_modal_${categoryId}`).close();
            setCategoryName('');
            setError('');
        } else {
            setError('Failed to update category');
        }
    };

    const handleChange = (e) => {
        setCategoryName(e.target.value);
        setError('');
    };

    const handleClose = () => {
        setCategoryName(currentName);
        setError('');
        document.getElementById(`update_modal_${categoryId}`).close();
    };

    return (
        <div>
            <button
                onClick={() => document.getElementById(`update_modal_${categoryId}`).showModal()}
                className='btn btn-ghost btn-xs'
                title="Edit">
                <Pen size={13} />
            </button>
            <dialog id={`update_modal_${categoryId}`} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Change Category Name</h3>
                    <label className="label">
                        <span className="label-text">Enter New Category Name</span>
                        <span className="label-text-alt">{categoryName.length}/50</span>
                    </label>
                    <input
                        name="categoryName"
                        value={categoryName}
                        onChange={handleChange}
                        type="text"
                        className={`input mt-2 input-bordered w-full ${error ? 'input-error' : ''}`}
                        placeholder="e.g., Work, Personal, Travel"
                        maxLength={50}
                    />
                    {error && (
                        <label className="label">
                            <span className="label-text-alt text-error">{error}</span>
                        </label>
                    )}
                    <div className="modal-action">
                        <form method="dialog" onSubmit={handleSubmit}>
                            <button
                                type="submit"
                                className="btn btn-primary mr-3"
                                disabled={loading}
                            >
                                {loading ? 'Updating...' : 'Update'}
                            </button>
                            <button
                                type="button"
                                className="btn btn-neutral"
                                onClick={handleClose}
                            >
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}