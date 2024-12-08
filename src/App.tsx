import { useContext, useState } from 'react';

import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import Jumbotron from './assets/components/Jumbotron';
import Toggle from './assets/components/Toggle';
import ToDoContainer from './assets/components/ToDoContainer';
function App() {
  return (
    <ThemeProvider>
      <Jumbotron />
      <div className={`size-full min-h-screen	px-6 -mt-[15vh]`}>
        <ToDoContainer />
        <Toggle />
      </div>
    </ThemeProvider>
  );
}

export default App;
