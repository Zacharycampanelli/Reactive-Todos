import { ThemeProvider } from "./context/ThemeContext";
import Jumbotron from "./components/Jumbotron";
import ToDoContainer from "./components/ToDoContainer";
import ThemeContainer from "./components/ThemeContainer";
import { TodoProvider } from "./context/ToDoContext";
import "./index.css";
import UserLinks from "./components/UserLinks";
import { useEffect, useState } from "react";
import AuthenticationModal from "./components/AuthenticationModal";
import ResetModal from "./components/ResetModal";
import { AuthProvider } from "./context/AuthContext";
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
