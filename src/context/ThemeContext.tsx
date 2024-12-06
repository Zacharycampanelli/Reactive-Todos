import { createContext, useState } from "react";
;
const ThemeContext = createContext({theme: 'light', toggleTheme: () => {}});

const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}       

export { ThemeContext, ThemeProvider };