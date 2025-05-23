import { FC, ReactNode } from "react";

import { useTheme } from "../context/ThemeContext";

interface ThemeContainerProps {
  children: ReactNode;
}

const ThemeContainer: FC<ThemeContainerProps> = ({ children }) => {
  const { theme } = useTheme();
  return <div className={theme}>{children}</div>;
};

export default ThemeContainer;
