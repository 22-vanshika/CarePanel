// Interceptor layer for the native fetch httpClient
// Attaches Firebase auth token to outgoing requests
// Handles 401 responses by clearing auth state

import { getAuth } from 'firebase/auth';
import { useAuthStore } from '../../app/store/authStore';

export const getAuthHeaders = async (): Promise<Record<string, string>> => {
  const token = await getAuth().currentUser?.getIdToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const handle401 = (): void => {
  useAuthStore.getState().clearUser();
  window.location.href = '/login';
};