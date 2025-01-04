import { useTheme } from '../context/ThemeContext';
import { ReactNode } from 'react';

const ThemeContainer = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  return <div className={theme}>{children}</div>;
};

export default ThemeContainer;
