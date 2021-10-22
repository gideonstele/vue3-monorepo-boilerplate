import { message } from 'ant-design-vue';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import router from '@/routes';
import tokenManager from './token';

// eslint-disable-next-line prettier/prettier
const baseURL = import.meta.env.VITE_API_URL;

export const ajax = axios.create({
  baseURL: baseURL.replace('__window_location__', `${location.protocol}//${location.host}`),
  timeout: 20000,
  withCredentials: true,
  paramsSerializer(params: Record<string | number, unknown>) {
    return qs.stringify(params, { arrayFormat: 'comma' });
  },
});

export type Result<T> = {
  code: number;
  message: string;
  data?: T;
};

ajax.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = tokenManager.get();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    /* 请求对象报错是不应该的 */
    __IS_DEV__ && console.error(error);
    Promise.reject(error);
  }
);

ajax.interceptors.response.use(
  (response: AxiosResponse<unknown>) => {
    if (!response) {
      return Promise.reject();
    }
    const data = response.data;
    switch (response.status) {
      case 401:
        // 没有权限，跳登录页
        // TODO: Tologin
        message.error('登录凭证无效或者已过期，请重新登录！', 3000);
        router.replace({ name: 'login' });
        return Promise.resolve({ code: 401, message: '' });
      case 403:
        message.error('请求服务器API时返回了403，您可能没有访问该功能的权限', 3000);
        return Promise.resolve(data);
      case 404:
        message.error('请求服务器API时返回了404，请确认该功能是否上线', 3000);
        return Promise.resolve({ code: 404, message: '' });
      default:
        return Promise.resolve(data);
    }
  },
  (error) => {
    // axios 主动取消的请求，不报错。
    if (axios.isCancel(error)) {
      return Promise.resolve({});
    }
    __IS_DEV__ && console.error('[MR][Ajax Response Error] ', error);
    if (error.message === 'Network Error') {
      const text = '由于网络原因，请求失败，请检查网络设置或刷新页面';
      message.error(text);
    }
    // message.error('服务端返回了未知错误', 5);
    return Promise.reject(error);
  }
);
