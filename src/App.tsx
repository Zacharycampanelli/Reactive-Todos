import { useContext, useState } from 'react';

import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import Jumbotron from './assets/components/Jumbotron';
import Toggle from './assets/components/Toggle';
function App() {
  return (
    <ThemeProvider>
      <div className={` size-full min-h-screen	`}>
        <Jumbotron />
      </div>
      <Toggle />
    </ThemeProvider>
  );
}

export default App;
