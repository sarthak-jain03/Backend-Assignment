import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import categoryService from '../services/categoryService';
import './Categories.css';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formName, setFormName] = useState('');
    const [formLoading, setFormLoading] = useState(false);

    const { user } = useAuth();
    const { showToast } = useToast();

    const isAdmin = user?.role === 'ADMIN';

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await categoryService.getAll();
            setCategories(data);
        } catch (err) {
            showToast('Failed to load categories', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const openCreateModal = () => {
        if (!isAdmin) {
            showToast('You do not have the authority to create a category. Admin role required.', 'error');
            return;
        }
        setEditingCategory(null);
        setFormName('');
        setShowModal(true);
    };

    const openEditModal = (category) => {
        if (!isAdmin) {
            showToast('You do not have the authority to edit a category. Admin role required.', 'error');
            return;
        }
        setEditingCategory(category);
        setFormName(category.name);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingCategory(null);
        setFormName('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formName.trim()) {
            showToast('Category name is required', 'error');
            return;
        }

        setFormLoading(true);
        try {
            if (editingCategory) {
                await categoryService.update(editingCategory.id, { name: formName });
                showToast('Category updated successfully!', 'success');
            } else {
                await categoryService.create({ name: formName });
                showToast('Category created successfully!', 'success');
            }
            closeModal();
            fetchCategories();
        } catch (err) {
            const msg = err.response?.data?.error || 'Operation failed';
            showToast(msg, 'error');
        } finally {
            setFormLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!isAdmin) {
            showToast('You do not have the authority to delete a category. Admin role required.', 'error');
            return;
        }
        if (!confirm('Are you sure you want to delete this category?')) return;
        try {
            await categoryService.delete(id);
            showToast('Category deleted successfully!', 'success');
            fetchCategories();
        } catch (err) {
            const msg = err.response?.data?.error || 'Delete failed';
            showToast(msg, 'error');
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Categories</h1>
                <button className="btn btn-primary" onClick={openCreateModal}>
                    + New Category
                </button>
            </div>

            {categories.length === 0 ? (
                <div className="empty-state animate-in">
                    <div className="empty-state-icon">📂</div>
                    <p className="empty-state-text">No categories yet. Create your first one!</p>
                    <button className="btn btn-primary" onClick={openCreateModal}>
                        Create Category
                    </button>
                </div>
            ) : (
                <div className="card-grid">
                    {categories.map((cat, index) => (
                        <div
                            key={cat.id}
                            className="card category-card animate-in"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className="category-card-header">
                                <div className="category-icon">📁</div>
                                <div className="category-info">
                                    <h3 className="category-name">{cat.name}</h3>
                                    <span className="category-count">
                                        {cat.products?.length || 0} product{(cat.products?.length || 0) !== 1 ? 's' : ''}
                                    </span>
                                </div>
                            </div>

                            {cat.products && cat.products.length > 0 && (
                                <div className="category-products-preview">
                                    {cat.products.slice(0, 3).map((p) => (
                                        <div key={p.id} className="product-preview-item">
                                            <span className="product-preview-name">{p.name}</span>
                                            <span className="product-preview-price">${p.price?.toFixed(2)}</span>
                                        </div>
                                    ))}
                                    {cat.products.length > 3 && (
                                        <span className="product-preview-more">
                                            +{cat.products.length - 3} more
                                        </span>
                                    )}
                                </div>
                            )}

                            <div className="category-actions">
                                <button
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => openEditModal(cat)}
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(cat.id)}
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create / Edit Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">
                                {editingCategory ? 'Edit Category' : 'New Category'}
                            </h2>
                            <button className="modal-close" onClick={closeModal}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="form-label">Category Name</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Enter category name"
                                        value={formName}
                                        onChange={(e) => setFormName(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary" disabled={formLoading}>
                                    {formLoading ? 'Saving...' : editingCategory ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
