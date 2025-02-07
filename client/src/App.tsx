import { ThemeProvider } from './context/ThemeContext';
import Jumbotron from './components/Jumbotron';
import ToDoContainer from './components/ToDoContainer';
import ThemeContainer from './components/ThemeContainer';
import { TodoProvider } from './context/ToDoContext';
import './index.css';
import UserLinks from './components/UserLinks';
import { useEffect, useState } from 'react';
import AuthenticationModal from './components/AuthenticationModal';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const [modalType, setModalType] = useState<'login' | 'register'>('login');

  return (
    <ThemeProvider>
      <TodoProvider>
        <ThemeContainer>
          <UserLinks isOpen={isOpen} toggleOpen={toggleOpen} setModalType={setModalType} />
          <Jumbotron />
          <div className="size-full min-h-screen px-6 -mt-[18vh] bg-dividerCircle -z-30 font-josefin">
            <ToDoContainer />
          </div>
          <AuthenticationModal isOpen={isOpen} toggleOpen={toggleOpen} modalType={modalType} setModalType={setModalType} />
        </ThemeContainer>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
