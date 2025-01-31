import { ThemeProvider } from './context/ThemeContext';
import Jumbotron from './components/Jumbotron';
import ToDoContainer from './components/ToDoContainer';
import ThemeContainer from './components/ThemeContainer';
import { TodoProvider } from './context/ToDoContext';
import './index.css';
import { useState } from 'react';
import AuthModal from './components/AuthModal';

function App() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalOption, setModalOption] = useState<'login' | 'signup'>('login');

  return (
    <ThemeProvider>
      <TodoProvider>
        <ThemeContainer>
          <Jumbotron setModalOption={setModalOption} setModalOpen={setModalOpen} />
          <div className="size-full min-h-screen px-6 -mt-[18vh] bg-dividerCircle -z-30 font-josefin">
            <ToDoContainer />
          </div>
          <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} option={modalOption} />
        </ThemeContainer>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
