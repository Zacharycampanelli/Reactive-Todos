import { ThemeProvider } from './context/ThemeContext';
import Jumbotron from './components/Jumbotron';
import ToDoContainer from './components/ToDoContainer';
import ThemeContainer from './components/ThemeContainer';
import { TodoProvider } from './context/ToDoContext';
import './index.css';
import UserLinks from './components/UserLinks';
import { useEffect, useState } from 'react';
import AuthenticationModal from './components/AuthenticationModal';
import ResetModal from './components/ResetModal';
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<'login' | 'register'>('login');
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [resetToken, setResetToken] = useState('');

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    const token = url.get('resetToken');

    if (token) {
      setResetToken(token);
      setResetModalOpen(true);

      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    }
  }, []);
console.log(window.location)
  const toggleResetModal = () => {
    setResetModalOpen(!resetModalOpen);
    // window.history.pushState({}, '', '/');
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <ThemeProvider>
      <TodoProvider>
        <ThemeContainer>
          <UserLinks isOpen={isOpen} toggleOpen={toggleOpen} setModalType={setModalType} />
          <Jumbotron />
          <div className="size-full min-h-screen px-6 -mt-[18vh] bg-dividerCircle -z-30 font-josefin">
            <ToDoContainer />
          </div>
          <AuthenticationModal
            isOpen={isOpen}
            toggleOpen={toggleOpen}
            modalType={modalType}
            setModalType={setModalType}
          />
          <ResetModal isOpen={resetModalOpen} onClose={toggleResetModal} token={resetToken}/>
        </ThemeContainer>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
