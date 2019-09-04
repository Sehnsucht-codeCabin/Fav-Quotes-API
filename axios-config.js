import axios from "axios";

const instance = axios.create({
  // eslint-disable-next-line no-useless-concat
  baseURL: 'https://favqs.com/api',
});

instance.defaults.headers.Authorization = 'Token token=' + '6d0437fdb86adb080871007f3c8fc1c2';

export default instance;