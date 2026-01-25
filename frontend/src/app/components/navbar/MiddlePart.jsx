import { useState } from "react";
import { useCategoryStore } from "../../store/Category.store";
import { useShortcutStore } from "../../store/shortcut.store";
import { AddShortcutModal } from "../modals/AddShortcutModal";
import { toast } from "react-hot-toast"
export const MiddlePart = () => {
    const { createShortcut, loading, error } = useShortcutStore();
    const { categories } = useCategoryStore();
    const [formData, setFormData] = useState({ name: '', url: '', categoryId: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name required';
        if (!formData.url.trim()) {
            newErrors.url = 'URL required';
        } else {
            try {
                new URL(formData.url);
            } catch {
                newErrors.url = 'Invalid URL';
            }
        }
        return newErrors;
    };

    const handleAddClick = () => {
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Open modal for category selection
        document.getElementById('category_select_modal').showModal();
    };

    const handleConfirmAdd = async () => {
        if (!formData.categoryId) {
            setErrors({ categoryId: 'Please select a category' });
            return;
        }

        const success = await createShortcut(formData);

        if (success) {
            toast.success(`${formData.name} is Added Successfully`)
            setFormData({ name: '', url: '', categoryId: '' });
            setErrors({});
            document.getElementById('category_select_modal').close();
        }
        else {
            setErrors({categoryId:error})
        }
    };

    const handleCloseModal = () => {
        setFormData(prev => ({ ...prev, categoryId: '' }));
        setErrors(prev => ({ ...prev, categoryId: '' }));
        document.getElementById('category_select_modal').close();
    };

    const userCategories = categories.filter(cat => cat._id !== 'all');

    return (
        <div>
            {/* Desktop Quick Add */}
            <div className='hidden md:flex items-start mt-5 justify-center gap-4 w-full max-w-2xl mx-auto'>
                <div className='w-full'>
                    <label className="floating-label">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter Name"
                            className={`input input-md w-full ${errors.name ? 'input-error' : ''}`}
                        />
                        <span className='text-lg'>Enter Name</span>
                    </label>
                    <div className="h-5">
                        {errors.name && <span className="text-error text-xs">{errors.name}</span>}
                    </div>
                </div>
                <div className='w-full'>
                    <label className="floating-label">
                        <input
                            type="text"
                            name="url"
                            value={formData.url}
                            onChange={handleChange}
                            placeholder="Enter Url"
                            className={`input input-md w-full ${errors.url ? 'input-error' : ''}`}
                        />
                        <span className='text-lg'>Enter Url</span>
                    </label>
                    <div className="h-5">
                        {errors.url && <span className="text-error text-xs">{errors.url}</span>}
                    </div>
                </div>
                <div className="pt-0">
                    <button
                        onClick={handleAddClick}
                        disabled={loading}
                        className='btn btn-neutral btn-md'
                    >
                        ADD
                    </button>
                </div>
            </div>

            {/* Mobile - Full Modal */}
            <div className='flex w-fit ml-auto md:hidden'>
                <AddShortcutModal />
            </div>

            {/* Desktop - Category Selection Modal */}
            <dialog id="category_select_modal" className="modal">
                <div className="modal-box max-w-2xl">
                    <h3 className="font-bold text-lg mb-4">Select Category</h3>

                    {/* Show entered data in same style */}
                    <div className="space-y-4 mb-6">
                        <div className='w-full'>
                            <label className="floating-label">
                                <input
                                    type="text"
                                    value={formData.name}
                                    className="input input-md w-full"
                                    disabled
                                />
                                <span className='text-lg'>Shortcut Name</span>
                            </label>
                        </div>
                        <div className='w-full'>
                            <label className="floating-label">
                                <input
                                    type="text"
                                    value={formData.url}
                                    className="input input-md w-full"
                                    disabled
                                />
                                <span className='text-lg'>URL</span>
                            </label>
                        </div>
                    </div>
                    {/* Category Dropdown */}
                    <div className='w-full'>
                        <label className="label">
                            <span className="label-text">Choose Category</span>
                        </label>
                        <select
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            className={`select select-bordered w-full ${errors.categoryId ? 'select-error' : ''}`}
                        >
                            <option value="">Select a category...</option>
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

                    <div className="modal-action">
                        <button
                            onClick={handleConfirmAdd}
                            disabled={loading}
                            className="btn btn-primary"
                        >
                            {loading ? 'Adding...' : 'Add Shortcut'}
                        </button>
                        <button
                            onClick={handleCloseModal}
                            className="btn btn-neutral"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};