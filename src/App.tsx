import { useState } from 'react';

import './index.css';
import { ThemeProvider } from './context/ThemeContext';
function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeProvider>
    <div className={`${theme} size-full min-h-screen	`}>
      <div className="bg-background ">

        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>change</button>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default App;
