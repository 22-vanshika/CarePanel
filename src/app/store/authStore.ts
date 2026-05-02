import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { AuthUser } from '../../modules/auth/types';

export interface AuthState {
    user: AuthUser | null;
    isLoading: boolean;
    error: string | null;
    setUser: (user: AuthUser | null) => void;
    clearUser: () => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
    devtools(
        (set) => ({
            user: null,
            isLoading: true,
            error: null,
            setUser: (user) => set({ user }, false, 'auth/setUser'),
            clearUser: () => set({ user: null }, false, 'auth/clearUser'),
            setLoading: (isLoading) => set({ isLoading }, false, 'auth/setLoading'),
            setError: (error) => set({ error }, false, 'auth/setError'),
        }),
        { name: 'AuthStore' }
    )
);

export const selectUser = (state: AuthState) => state.user;
export const selectAuthIsLoading = (state: AuthState) => state.isLoading;
export const selectAuthError = (state: AuthState) => state.error;