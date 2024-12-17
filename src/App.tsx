import { useContext, useState } from 'react';

import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import Jumbotron from './assets/components/Jumbotron';
import ToDoContainer from './assets/components/ToDoContainer';
import ThemeContainer from './assets/components/ThemeContainer';
import { TodoProvider } from './context/ToDoContext';
function App() {
  return (
    <ThemeProvider>
      <TodoProvider>

    <ThemeContainer>


      <Jumbotron />
      <div className={`size-full min-h-screen	px-6 -mt-[25vh]`}>
        <ToDoContainer />
      
      </div>
    </ThemeContainer>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
