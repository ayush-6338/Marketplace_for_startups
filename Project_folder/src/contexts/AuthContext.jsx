import { createContext, useContext, useEffect, useState } from 'react';
import { getMe } from '../services/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await getMe();
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) fetchUser();
    else setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const loginAction = (token, userData) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, loginAction }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
