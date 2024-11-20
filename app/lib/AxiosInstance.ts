import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DB_HOST,
  withCredentials: true,
  headers:{
    'Content-Type': 'application/json',
  }
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response Headers:", response.headers);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
