import "./index.css";

import { useEffect, useState } from "react";

import { AuthProvider } from "./context/AuthContext";
import AuthenticationModal from "./components/AuthenticationModal";
import Jumbotron from "./components/Jumbotron";
import ResetModal from "./components/ResetModal";
import ThemeContainer from "./components/ThemeContainer";
import { ThemeProvider } from "./context/ThemeContext";
import ToDoContainer from "./components/ToDoContainer";
import { TodoProvider } from "./context/ToDoContext";
import UserLinks from "./components/UserLinks";

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"login" | "register">("login");
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [resetToken, setResetToken] = useState("");

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    const token = url.get("resetToken");

    if (token) {
      setResetToken(token);
      setResetModalOpen(true);

      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    }
  }, []);

  const toggleResetModal = () => {
    setResetModalOpen(!resetModalOpen);
  };

  const toggleAuthModal = () => setIsAuthModalOpen(!isAuthModalOpen);

  return (
    <AuthProvider>
      <ThemeProvider>
        <TodoProvider>
          <ThemeContainer>
            <UserLinks
              isAuthModalOpen={isAuthModalOpen}
              toggleAuthModal={toggleAuthModal}
              setModalType={setModalType}
            />
            <Jumbotron />
            <div className="bg-dividerCircle font-josefin -z-30 -mt-[18vh] size-full min-h-screen px-6">
              <ToDoContainer />
            </div>
            <AuthenticationModal
              isAuthModalOpen={isAuthModalOpen}
              toggleAuthModal={toggleAuthModal}
              modalType={modalType}
              setModalType={setModalType}
              setResetModalOpen={setResetModalOpen}
            />
            <ResetModal
              isAuthModalOpen={resetModalOpen}
              onClose={toggleResetModal}
              token={resetToken}
            />
          </ThemeContainer>
        </TodoProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
