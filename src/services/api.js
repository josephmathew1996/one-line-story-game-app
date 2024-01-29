import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Update with your server URL
});

export default api;
