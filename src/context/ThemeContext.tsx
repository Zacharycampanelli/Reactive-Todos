import { createContext, ReactNode, useContext, useState } from 'react';

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} });

const ThemeProvider = ({ children }: { children: ReactNode}) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

const useTheme = () => {
  return useContext(ThemeContext);
};

export { ThemeProvider, useTheme };
