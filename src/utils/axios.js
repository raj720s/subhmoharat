import axios from 'axios';

const axioss = axios.create({
    baseURL: 'http://localhost:4000/api/v1',
});

// Add a request interceptor
// axioss.interceptors.request.use((config) => {
//     return config;
//     const token = localStorage.getItem('token');
//     config.headers.Authorization = token ? `Bearer ${token}` : '';
// });

// // Add a response interceptor
// axioss.interceptors.response.use((response) => {
//     return response;
// }, (error) => {
//     // Do something with response error
//     return Promise.reject(error);
// });

export default axioss;
