import axios from 'axios';
import { Message } from 'element-ui';
// import store from '../store';
import { getToken } from '@/utils/auth';
// import qs from 'qs';
import { baseUrl } from './baseUrl'

// 创建axios实例
const service = axios.create({
  baseURL: baseUrl, // api的
  timeout: 10000,
  // 请求超时时间
  transformRequest: [function (data) {
    if (Object.prototype.toString.call(data) === '[object FormData]') {
      return data
    }
    data = JSON.stringify(data);
    // console.log(data);
    return data;
  }]
});

// request拦截器
service.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${getToken()}`;
    }
    // config.data = qs.stringify(config.data);
    config.headers['Content-Type'] = 'application/json';
    // console.log(getToken());
    // console.log(store.getters.token);

    return config;
  },
  error => {
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    console.log('err' + error); // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
