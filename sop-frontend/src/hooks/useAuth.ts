import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';
import { authApi } from '@/api/authApi';
import { ROUTES } from '@/utils/constants';

export const useAuth = () => {
  const { login: storeLogin, logout: storeLogout, setUser, user, isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const login = useCallback(async (email: string, password: string) => {
    try {
      const data = await authApi.login(email, password);
      storeLogin(data.user, data.token);
      toast.success('Welcome back!');
      navigate(ROUTES.CHAT);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Invalid credentials';
      toast.error(message);
      throw error;
    }
  }, [storeLogin, navigate]);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // logout even if API fails
    } finally {
      storeLogout();
      navigate(ROUTES.LOGIN);
    }
  }, [storeLogout, navigate]);

  const fetchUser = useCallback(async () => {
    try {
      const data = await authApi.getMe();
      setUser(data.user);
    } catch {
      storeLogout();
    }
  }, [setUser, storeLogout]);

  return { login, logout, fetchUser, user, isLoggedIn };
};
