import api from './api';

const categoryService = {
    getAll: async () => {
        const response = await api.get('/api/categories');
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/api/categories/${id}`);
        return response.data;
    },

    create: async (categoryDTO) => {
        const response = await api.post('/api/categories', categoryDTO);
        return response.data;
    },

    update: async (id, categoryDTO) => {
        const response = await api.put(`/api/categories/${id}`, categoryDTO);
        return response.data;
    },

    patch: async (id, categoryDTO) => {
        const response = await api.patch(`/api/categories/${id}`, categoryDTO);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/api/categories/${id}`);
        return response.data;
    },
};

export default categoryService;
