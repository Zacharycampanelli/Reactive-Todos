import { useContext, useState } from 'react';

import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import Jumbotron from './assets/components/Jumbotron';
import ToDoContainer from './assets/components/ToDoContainer';
import ThemeContainer from './assets/components/ThemeContainer';
function App() {
  return (
    <ThemeProvider>
    <ThemeContainer>


      <Jumbotron />
      <div className={`size-full min-h-screen	px-6 -mt-[15vh]`}>
        <ToDoContainer />
      
      </div>
    </ThemeContainer>
    </ThemeProvider>
  );
}

export default App;
