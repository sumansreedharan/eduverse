// import axios from 'axios'


// const api = axios.create({
//     baseURL: "http://localhost:3001/",
//     timeout: 2000,
//   });

//   export default api


import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3001/",
  timeout: 2000,
});

// Function to add the Authorization header to the request
const addAuthorizationHeader = (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// Function to handle request errors
const handleRequestError = (error) => {
  console.error('Request error:', error);
  return Promise.reject(error);
};

// Add request interceptor
api.interceptors.request.use(addAuthorizationHeader, handleRequestError);

export default api;
