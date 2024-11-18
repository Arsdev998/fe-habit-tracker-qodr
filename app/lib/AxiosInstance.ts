import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DB_HOST,
  withCredentials: true
});

export default axiosInstance;
