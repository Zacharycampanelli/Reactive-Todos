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
  login: (userData: any) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Load user from local storage if exists
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await fetchUserData();
      if (userData) setUser(userData);
    };
    loadUserData();
  }, []);

  //   const login = (userData: User) => {
  //     setUser(userData);
  //     localStorage.setItem('user', JSON.stringify(userData)); // Store user data persistently
  //   };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user data from local storage
    window.location.href = '/';
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within an AuthProvider');
  return context;
};
