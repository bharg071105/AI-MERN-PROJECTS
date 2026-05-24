import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/utils/constants';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { isLoggedIn, user } = useAuthStore();

  if (!isLoggedIn) return <Navigate to={ROUTES.LOGIN} replace />;
  if (adminOnly && user?.role !== 'admin') return <Navigate to={ROUTES.CHAT} replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
