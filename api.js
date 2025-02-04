import axios from 'axios';
import { ACCESS_TOKEN } from './constants';

// Base API instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://subscripts.ai/", // Ensure this matches your backend root URL
    timeout: 1200000, // Set timeout to groot genoeg
});

// Request interceptor (attach token to headers)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor (error handling)
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('Response error:', error);
        // Handle specific error codes
        if (error.response?.status === 401) {
            alert('Your session has expired. Please log in again.');
            window.location.href = '/login'; // Optional: Redirect to login page
        } else if (error.response?.status >= 500) {
            alert('A server error occurred. Please try again later.');
        }
        return Promise.reject(error);
    }
);

// General API functions
const apiService = {
    get: (url, params = {}) => api.get(url, { params }),
    post: (url, data, config = {}) => api.post(url, data, config),
    put: (url, data, config = {}) => api.put(url, data, config),
    delete: (url, config = {}) => api.delete(url, config),
};

export default apiService;