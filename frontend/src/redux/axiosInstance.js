import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://47df-2405-204-1287-fbe7-f923-7e02-f974-1f96.ngrok-free.app/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;