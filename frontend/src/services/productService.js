import api from './api';

const productService = {
    getAll: async () => {
        const response = await api.get('/api/products');
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/api/products/${id}`);
        return response.data;
    },

    create: async (productDTO) => {
        const response = await api.post('/api/products', productDTO);
        return response.data;
    },

    update: async (id, productDTO) => {
        const response = await api.put(`/api/products/${id}`, productDTO);
        return response.data;
    },

    patch: async (id, productDTO) => {
        const response = await api.patch(`/api/products/${id}`, productDTO);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/api/products/${id}`);
        return response.data;
    },
};

export default productService;
