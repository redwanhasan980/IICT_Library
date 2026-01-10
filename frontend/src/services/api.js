import axios from 'axios';

// Dynamically use the IP address or localhost depending on how the page is accessed
// This allows access from both localhost and other devices on the network
const API_URL = `http://${window.location.hostname}:5000/api`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
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

export default api;
