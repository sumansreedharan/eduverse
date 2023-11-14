
// import axios from 'axios';

// const api = axios.create({
//   baseURL: "http://localhost:3001/",
//   timeout: 2000,
// });

// // Function to add the Authorization header to the request
// const addAuthorizationHeader = (config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// };

// // Function to handle request errors
// const handleRequestError = (error) => {
//   console.error('Request error:', error);
//   return Promise.reject(error);
// };

// // Add request interceptor
// api.interceptors.request.use(addAuthorizationHeader, handleRequestError);

// export default api;


import axios from 'axios';
import Swal from "sweetalert2"

const api = axios.create({
  baseURL: "https://www.chordsconnect.online/",
  timeout: 4000,
});

// Function to add the Authorization header to the request
const addAuthorizationHeader = (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// Add request interceptor
api.interceptors.request.use(addAuthorizationHeader);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if(error.response.status===403){
      localStorage.removeItem('token')
    }
    console.error('Request error:', error);
    const errorMessage = error.response?.data?.message || 'An error occurred';
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: errorMessage,
    });
    return Promise.reject(error);
  }
);

export default api;

