/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */
/* eslint-disable func-names */
/* eslint-disable linebreak-style */
/* eslint-disable prefer-template */
/* eslint-disable quotes */
/* eslint-disable no-useless-concat */
/* eslint-disable linebreak-style */
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://favqs.com/api',
});

axiosInstance.defaults.headers.Authorization = 'Token token=' + '6d0437fdb86adb080871007f3c8fc1c2';

axiosInstance.interceptors.request.use((config) => {
  let myToken = localStorage.getItem('sessionToken') ? localStorage.getItem('sessionToken') : null;
  config.headers['User-Token'] = myToken;
  return config;
}, error => Promise.reject(error));

// Add a response interceptor
axiosInstance.interceptors.response.use((response) => {
  return response;
}, error => Promise.reject(error));

export default axiosInstance;
