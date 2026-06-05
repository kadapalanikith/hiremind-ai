import axios from 'axios';

/**
 * Shared Axios instance for all API calls.
 * Uses VITE_API_URL env var in production, falls back to localhost in development.
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    withCredentials: true, // Always send cookies
    timeout: 60000, // 60s timeout (AI calls can take ~30s)
});

// Response interceptor: normalize error messages
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error.response?.data?.message ||
            error.message ||
            'An unexpected error occurred.';
        // Attach the clean message to the error
        error.userMessage = message;
        return Promise.reject(error);
    }
);

export default api;
