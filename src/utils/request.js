import axios from 'axios';
import { Message } from 'element-ui';
// import store from '../store';
import { getToken } from '@/utils/auth';
// import qs from 'qs';

// 创建axios实例
const service = axios.create({
  // baseURL: "http://test01.synconize.com/v1/", // api的base_url——开发环境
  baseURL: 'http://101.133.143.185:1117', // api的base_url  ——生产环境
  timeout: 10000
  // 请求超时时间
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
