import axios from 'axios';

// Base configuration for axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get token from localStorage (if available)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = Bearer `${token}`;
  }
  return config;
});

export default api;