import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import productService from '../services/productService';
import categoryService from '../services/categoryService';
import './Products.css';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formLoading, setFormLoading] = useState(false);

    const [formName, setFormName] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const [formPrice, setFormPrice] = useState('');
    const [formCategoryId, setFormCategoryId] = useState('');

    const { user, isAuthenticated } = useAuth();
    const { showToast } = useToast();

    const isAdmin = user?.role === 'ADMIN';

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await productService.getAll();
            setProducts(data);
        } catch (err) {
            showToast('Failed to load products', 'error');
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await categoryService.getAll();
            setCategories(data);
        } catch {
            // Categories might fail if not authenticated; that's ok for public product view
        }
    };

    useEffect(() => {
        fetchProducts();
        if (isAuthenticated) {
            fetchCategories();
        }
    }, [isAuthenticated]);

    const openCreateModal = () => {
        if (!isAdmin) {
            showToast('You do not have the authority to create a product. Admin role required.', 'error');
            return;
        }
        setEditingProduct(null);
        setFormName('');
        setFormDescription('');
        setFormPrice('');
        setFormCategoryId(categories[0]?.id || '');
        setShowModal(true);
    };

    const openEditModal = (product) => {
        if (!isAdmin) {
            showToast('You do not have the authority to edit a product. Admin role required.', 'error');
            return;
        }
        setEditingProduct(product);
        setFormName(product.name || '');
        setFormDescription(product.description || '');
        setFormPrice(product.price?.toString() || '');
        setFormCategoryId(product.categoryId?.toString() || '');
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingProduct(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formName.trim() || !formPrice || !formCategoryId) {
            showToast('Please fill in all required fields', 'error');
            return;
        }

        const dto = {
            name: formName,
            description: formDescription,
            price: parseFloat(formPrice),
            categoryId: parseInt(formCategoryId),
        };

        setFormLoading(true);
        try {
            if (editingProduct) {
                await productService.update(editingProduct.id, dto);
                showToast('Product updated successfully!', 'success');
            } else {
                await productService.create(dto);
                showToast('Product created successfully!', 'success');
            }
            closeModal();
            fetchProducts();
        } catch (err) {
            const msg = err.response?.data?.error || 'Operation failed';
            showToast(msg, 'error');
        } finally {
            setFormLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!isAdmin) {
            showToast('You do not have the authority to delete a product. Admin role required.', 'error');
            return;
        }
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            await productService.delete(id);
            showToast('Product deleted successfully!', 'success');
            fetchProducts();
        } catch (err) {
            const msg = err.response?.data?.error || 'Delete failed';
            showToast(msg, 'error');
        }
    };

    const getCategoryName = (categoryId) => {
        const cat = categories.find((c) => c.id === categoryId);
        return cat?.name || `#${categoryId}`;
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
                <h1 className="page-title">Products</h1>
                <button className="btn btn-primary" onClick={openCreateModal}>
                    + New Product
                </button>
            </div>

            {products.length === 0 ? (
                <div className="empty-state animate-in">
                    <div className="empty-state-icon">📦</div>
                    <p className="empty-state-text">No products yet.</p>
                    <button className="btn btn-primary" onClick={openCreateModal}>
                        Create Product
                    </button>
                </div>
            ) : (
                <div className="card-grid">
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            className="card product-card animate-in"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className="product-card-top">
                                <div className="product-price-tag">${product.price?.toFixed(2)}</div>
                                <span className="product-category-badge">
                                    {getCategoryName(product.categoryId)}
                                </span>
                            </div>
                            <h3 className="product-name">{product.name}</h3>
                            {product.description && (
                                <p className="product-description">{product.description}</p>
                            )}

                            <div className="product-actions">
                                <button
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => openEditModal(product)}
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(product.id)}
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
                                {editingProduct ? 'Edit Product' : 'New Product'}
                            </h2>
                            <button className="modal-close" onClick={closeModal}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="form-label">Product Name *</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Enter product name"
                                        value={formName}
                                        onChange={(e) => setFormName(e.target.value)}
                                        autoFocus
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Description</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Enter product description"
                                        value={formDescription}
                                        onChange={(e) => setFormDescription(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Price *</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        className="form-input"
                                        placeholder="0.00"
                                        value={formPrice}
                                        onChange={(e) => setFormPrice(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Category *</label>
                                    <select
                                        className="form-input"
                                        value={formCategoryId}
                                        onChange={(e) => setFormCategoryId(e.target.value)}
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary" disabled={formLoading}>
                                    {formLoading ? 'Saving...' : editingProduct ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
