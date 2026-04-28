import httpClient from './httpClient';
import { useAuthStore } from '../../app/store/authStore';
import { getAuth } from 'firebase/auth';

export function setupInterceptors(): void {
  httpClient.interceptors.request.use(
    async (config) => {
      const token = await getAuth().currentUser?.getIdToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  httpClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        useAuthStore.getState().clearUser();
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
}
