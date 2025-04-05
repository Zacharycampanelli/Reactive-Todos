import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Fieldset,
} from "@headlessui/react";
import { Dispatch, FC, SetStateAction } from "react";

import LoginModalBody from "./LoginModalBody";
import RegisterModalBody from "./RegisterModalBody";
import { useTheme } from "../context/ThemeContext";

interface AuthenticationModalProps {
  isAuthModalOpen: boolean;
  toggleAuthModal: () => void;
  modalType: "login" | "register";
  setModalType: Dispatch<SetStateAction<"login" | "register">>;
  setResetModalOpen: Dispatch<SetStateAction<boolean>>;
}

const AuthenticationModal: FC<AuthenticationModalProps> = ({
  isAuthModalOpen,
  toggleAuthModal,
  modalType,
  setModalType,
  setResetModalOpen,
}) => {
  const { theme } = useTheme();

  return (
    <Dialog
      open={isAuthModalOpen}
      onClose={toggleAuthModal}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <DialogPanel
        className={`relative w-[90%] max-w-md p-6 md:max-w-lg md:p-8 lg:max-w-xl ${
          theme === "light" ? "bg-white" : "bg-gray-800"
        } scale-95 transform rounded-lg shadow-lg transition-all duration-300`}
      >
        {/* Title */}
        <DialogTitle
          className={`text-center text-2xl font-semibold md:text-3xl ${
            theme === "light" ? "text-gray-900" : "text-white"
          } mb-6`}
        >
          {modalType === "login" ? "Log In" : "Register"}
        </DialogTitle>

        {/* Form Fields */}
        <Fieldset className="space-y-4">
          {modalType === "login" ? (
            <LoginModalBody
              setResetModalOpen={setResetModalOpen}
              onClose={toggleAuthModal}
            />
          ) : (
            <RegisterModalBody />
          )}
        </Fieldset>
        {/* Toggle between Login & Register */}
        <div
          className={`mt-6 text-center text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"} `}
        >
          {modalType === "login" ? (
            <Button
              onClick={() => setModalType("register")}
              className={`${theme === "light" ? "text-blue-600" : "text-blue-400"} hover:underline`}
            >
              New user? Sign up here
            </Button>
          ) : (
            <Button
              onClick={() => setModalType("login")}
              className={`${theme === "light" ? "text-blue-600" : "text-blue-400"} hover:underline`}
            >
              {" "}
              Already have an account? Log in here
            </Button>
          )}
        </div>
        {/* Close Button */}
        <span
          onClick={toggleAuthModal}
          className={`absolute right-4 top-3 ${
            theme === "light"
              ? "text-gray-500 hover:text-gray-800"
              : "text-gray-300 hover:text-white"
          } cursor-pointer text-xl`}
        >
          &times;
        </span>
      </DialogPanel>
    </Dialog>
  );
};

export default AuthenticationModal;
