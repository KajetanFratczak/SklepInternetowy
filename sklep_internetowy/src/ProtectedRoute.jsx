//Komponent ProtectedRoute to mechanizm do ochrony tras w aplikacji, zapewniający, że tylko zalogowani użytkownicy mogą uzyskać dostęp do określonych zasobów.
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;