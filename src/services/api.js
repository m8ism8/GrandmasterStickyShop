import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true
});

// Add request interceptor to handle CORS
api.interceptors.request.use(
    (config) => {
        // Ensure headers are set for each request
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const apiService = {
    async getProducts() {
        try {
            const response = await api.get('/products');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async getCategories() {
        try {
            const response = await api.get('/categories');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async register(userData) {
        try {
            const response = await api.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            if (error.response?.status === 400) {
                throw new Error('Username already exists');
            }
            throw error;
        }
    },

    async login(username, password) {
        try {
            const response = await api.post('/auth/login', {
                username,
                password
            });
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                throw new Error('Invalid username or password');
            }
            throw error;
        }
    },

    async logout() {
        try {
            const response = await api.post('/auth/logout');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}; 