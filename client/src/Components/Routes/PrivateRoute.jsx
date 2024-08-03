import { useState, useEffect } from 'react';
import { useAuth } from '../../Context/Auth';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Loader from '../Utility/Loader';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      const response = await axios(`${import.meta.env.VITE_API_URL}/api/v1/auth/user-auth`, {
        headers: {
          'Authorization': `${auth.token}`,
        },
      });

      if (response.data.status === 'ok') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    if (auth?.token) checkAuth();
  }, [auth?.token]);

  if (!isAuthenticated) {
    return <Loader />;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
