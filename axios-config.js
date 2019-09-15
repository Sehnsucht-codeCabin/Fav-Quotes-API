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
  // eslint-disable-next-line no-useless-concat
  baseURL: 'https://favqs.com/api',
});

axiosInstance.defaults.headers.Authorization = 'Token token=' + '6d0437fdb86adb080871007f3c8fc1c2';

// eslint-disable-next-line consistent-return
// eslint-disable-next-line arrow-parens
axiosInstance.interceptors.request.use(config => {
  let myToken = localStorage.getItem('sessionToken') ? localStorage.getItem('sessionToken') : null;
  config.headers['User-Token'] = myToken;
  return config;
}, error => Promise.reject(error));

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export default axiosInstance;
