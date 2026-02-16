import api from './api';

const authService = {
    login: async (username, password) => {
        const response = await api.post('/auth/login', { username, password });
        return response.data;
    },

    signup: async (username, password, role) => {
        const response = await api.post('/auth/signup', { username, password, role });
        return response.data;
    },
};

export default authService;
