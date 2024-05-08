import axios from 'axios';

console.log('hello');

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
});

export default apiClient;
