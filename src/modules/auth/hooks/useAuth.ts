import { useAuthStore } from '../../../app/store/authStore';
import { loginWithEmail, logout as firebaseLogout } from '../services/firebaseAuth';
import type { LoginCredentials } from '../types';

export const useAuth = () => {
    const user = useAuthStore((state) => state.user);
    const isLoading = useAuthStore((state) => state.isLoading);
    const error = useAuthStore((state) => state.error);

    const setLoading = useAuthStore((state) => state.setLoading);
    const setError = useAuthStore((state) => state.setError);
    const setUser = useAuthStore((state) => state.setUser);
    const clearUser = useAuthStore((state) => state.clearUser);

    const login = async (credentials: LoginCredentials): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            const authUser = await loginWithEmail(credentials.email, credentials.password);
            setUser(authUser);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Login failed'
            setError(message)
        } finally {
            setLoading(false);
        }
    };

    const logout = async (): Promise<void> => {
        try {
            setLoading(true);
            await firebaseLogout();
            clearUser();
        } catch (err: any) {
            setError(err.message || 'Logout failed');
        } finally {
            setLoading(false);
        }
    };

    return { user, isLoading, error, login, logout };
};
