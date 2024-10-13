import Cookie from 'js-cookie';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { HOST_API } from 'src/config-global';

import { ACCESS_TOKEN } from '../auth/constants';

export interface Params {
  page: number;
  limit: number;
  status?: string;
  filters?: string;
  created_at?: string;
  headers?: { access_token: string };
}
const axiosInstance: AxiosInstance = axios.create({
  baseURL: HOST_API,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': Cookie.get('Language') ? Cookie.get('Language') : 'en',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    Authorization: `Bearer ${Cookie.get(ACCESS_TOKEN)}`,
  },
});
axios.interceptors.request.use(
  (config) => {
    config.headers['Accept-Language'] = Cookie.get('Language');
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

export const baseUrl = HOST_API;

export const fetcher = async ({ url, config }: { url: string; config?: AxiosRequestConfig }) => {
  // Use axiosInstance directly instead of creating a new instance
  const response = await axiosInstance.get(url, {
    ...config,
    headers: {
      Authorization: `Bearer ${Cookie.get(ACCESS_TOKEN)}`,
      'Accept-Language': Cookie.get('Language') || 'en',
    },
  });

  return response.data;
};
export const getErrorMessage = (error: unknown): string => {
  let message: string;
  if (error instanceof Error) {
    // eslint-disable-next-line prefer-destructuring
    message = error.message;
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message);
  } else if (typeof error === 'string') {
    message = error;
  } else {
    message = 'Something went wrong';
  }
  return message;
};

export const endpoints = {
  auth: {
    me: '/auth/me',
    login: '/auth/signin',
    register: '/auth/register',
  },
  centers: {
    fetch: '/admin-panel/all-centers',
    cities: '/city-neighborhood/all-cities',
    neighborhoods: (cityId: string) => `/city-neighborhood/all-neighborhoods/${cityId}`,
  },
};
