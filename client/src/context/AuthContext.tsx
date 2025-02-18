import { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import { fetchUserData } from '../../utils/auth';

interface User {
  name: string;
  email: string;
  password: string;
  toDos: string[];
}

interface AuthContextType {
  user: any;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const loadUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token || token === 'null') {
        return;
      }
      const userData = await fetchUserData();
      if (userData) setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    };
    loadUserData();
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); 
    localStorage.setItem('token', token); 
  };

  const logout = () => {
    setUser(null); 
    localStorage.removeItem('user');
    localStorage.removeItem('token'); 
    window.location.href = '/'; 
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within an AuthProvider');
  return context;
};
