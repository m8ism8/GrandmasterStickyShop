import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json; charset=utf-8'
    },
    withCredentials: true
});

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
    }
}; 