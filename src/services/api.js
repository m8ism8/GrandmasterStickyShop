import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear token and redirect to login if unauthorized
            localStorage.removeItem('token');
            localStorage.removeItem('account');
            window.location.href = '/login';
        }
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

    async register(username, password, is_seller = false) {
        try {
            const response = await api.post('/auth/register', { username, password, is_seller });
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('account', JSON.stringify({
                username: response.data.username,
                is_seller: response.data.is_seller
            }));
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
            const response = await api.post('/auth/login', { username, password });
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('account', JSON.stringify({
                username: response.data.username,
                is_seller: response.data.is_seller
            }));
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
            localStorage.removeItem('token');
            localStorage.removeItem('account');
            const response = await api.post('/auth/logout');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async createProduct(productData) {
        try {
            const response = await api.post('/products', productData);
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                throw new Error('You must be logged in to create products');
            }
            if (error.response?.status === 403) {
                throw new Error('You must be a seller to create products');
            }
            throw error;
        }
    },

    async createOrder(products) {
        try {
            const response = await api.post('/orders', { products });
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                throw new Error('You must be logged in to place an order');
            }
            throw error;
        }
    },

    async getMyOrders() {
        try {
            const response = await api.get('/orders/mine');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async getOrdersForMyProducts() {
        try {
            const response = await api.get('/orders/for-my-products');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}; 