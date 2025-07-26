import axios from 'axios';

const axiosInstance = (token) =>
  axios.create({
    baseURL: '/api',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export default axiosInstance;

