import axios from "axios";

const axiosInstance = axios.create({
  // eslint-disable-next-line no-useless-concat
  baseURL: 'https://favqs.com/api',
});

axiosInstance.defaults.headers.Authorization = 'Token token=' + '6d0437fdb86adb080871007f3c8fc1c2';

export default axiosInstance;