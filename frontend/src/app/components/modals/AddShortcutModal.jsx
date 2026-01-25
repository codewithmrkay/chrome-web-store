import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useCategoryStore } from '../../store/Category.store';
import { useShortcutStore } from '../../store/shortcut.store';


export const AddShortcutModal = () => {
    const [formData, setFormData] = useState({
        name: '',
        url: '',
        categoryId: ''
    });
    const [errors, setErrors] = useState({});

    const { categories } = useCategoryStore();
    const { createShortcut, loading } = useShortcutStore();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.url.trim()) {
            newErrors.url = 'URL is required';
        } else {
            try {
                new URL(formData.url);
            } catch {
                newErrors.url = 'Please enter a valid URL (e.g., https://example.com)';
            }
        }

        if (!formData.categoryId) {
            newErrors.categoryId = 'Please select a category';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const success = await createShortcut(formData);

        if (success) {
            document.getElementById('add_shortcut_modal').close();
            setFormData({ name: '', url: '', categoryId: '' });
            setErrors({});
        } else {
            setErrors({ api: 'Failed to create shortcut' });
        }
    };

    const handleClose = () => {
        setFormData({ name: '', url: '', categoryId: '' });
        setErrors({});
        document.getElementById('add_shortcut_modal').close();
    };


    const userCategories = categories.filter(cat => cat._id !== 'all');

    return (
        <div>
            <button
                onClick={() => document.getElementById('add_shortcut_modal').showModal()}
                className='btn btn-primary btn-md gap-2'
            >
                <Plus size={18} />
                Add Shortcut
            </button>

            <dialog id="add_shortcut_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-2xl">
                    <h3 className="font-bold text-lg mb-4">Add Custom Shortcut</h3>

                    {errors.api && (
                        <div className="alert alert-error mb-4">
                            <span>{errors.api}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-4'>
                            {/* Name Input */}
                            <div className='w-full'>
                                <label className="label">
                                    <span className="label-text">Shortcut Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g., GitHub"
                                    className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                                />
                                {errors.name && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.name}</span>
                                    </label>
                                )}
                            </div>

                            {/* URL Input */}
                            <div className='w-full'>
                                <label className="label">
                                    <span className="label-text">URL</span>
                                </label>
                                <input
                                    type="text"
                                    name="url"
                                    value={formData.url}
                                    onChange={handleChange}
                                    placeholder="https://github.com"
                                    className={`input input-bordered w-full ${errors.url ? 'input-error' : ''}`}
                                />
                                {errors.url && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.url}</span>
                                    </label>
                                )}
                            </div>

                            {/* Category Dropdown */}
                            <div className='w-full'>
                                <label className="label">
                                    <span className="label-text">Select Category</span>
                                </label>
                                <select
                                    name="categoryId"
                                    value={formData.categoryId}
                                    onChange={handleChange}
                                    className={`select select-bordered w-full ${errors.categoryId ? 'select-error' : ''}`}
                                >
                                    <option value="">Choose category...</option>
                                    {userCategories.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.categoryId && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.categoryId}</span>
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="modal-action">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? 'Adding...' : 'Add Shortcut'}
                            </button>
                            <button
                                type="button"
                                className="btn btn-neutral"
                                onClick={handleClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};