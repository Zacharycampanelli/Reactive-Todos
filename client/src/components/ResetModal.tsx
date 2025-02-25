import { Button, Dialog, DialogPanel, Input } from "@headlessui/react";
import { FC, useState } from "react";
import { forgotPassword, handleReset } from "../../utils/reset";
import { useTheme } from "../context/ThemeContext";

interface ResetModalProps {
  isAuthModalOpen: boolean;
  onClose: () => void;
  token: string;
}

const ResetModal: FC<ResetModalProps> = ({
  isAuthModalOpen,
  onClose,
  token,
}) => {
  const { theme } = useTheme();
  const [newPassword, setNewPassword] = useState("");
  const [enterEmail, setEnterEmail] = useState("");
  const [message, setMessage] = useState("");

  const resetHandler = (e: React.FormEvent) => {
    e.preventDefault();
    handleReset(token, newPassword, setMessage, onClose);
  };

  const emailHandler = (e: React.FormEvent) => {
    e.preventDefault();
    forgotPassword(enterEmail, setMessage);
  };

  if (!token)
    return (
      <Dialog
        open={isAuthModalOpen}
        onClose={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      >
        <DialogPanel
          className={`relative w-[90%] max-w-md p-6 md:max-w-lg md:p-8 lg:max-w-xl ${theme === "light" ? "bg-white" : "bg-gray-800"} scale-95 transform rounded-lg shadow-lg transition-all duration-300`}
        >
          <form onSubmit={emailHandler} className="mx-8 space-y-4">
            <h2
              className={`mt-8 text-center text-2xl font-semibold md:text-3xl ${
                theme === "light" ? "text-gray-900" : "text-white"
              } mb-6`}
            >
              Reset Password
            </h2>
            <Input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEnterEmail(e.target.value)}
              className={`${
                theme === "light"
                  ? "border-gray-300 bg-white text-gray-900"
                  : "border-gray-600 bg-gray-700 text-white"
              } w-full rounded-md border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <div className="flex flex-col">
              <Button
                type="submit"
                className="w-full rounded-md bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Get Reset Link
              </Button>
              <Button
                onClick={onClose}
                className={`${theme === "light" ? "text-blue-600" : "text-blue-400"} transition hover:underline`}
              >
                Close
              </Button>
            </div>
          </form>
          {message && <p>{message}</p>}
        </DialogPanel>
      </Dialog>
    );

  return (
    <Dialog
      open={isAuthModalOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 size-full"
    >
      <DialogPanel className="relative top-[50%] mx-auto my-auto flex h-screen w-screen -translate-y-[50%] flex-col rounded-lg bg-white shadow-lg">
        <form onSubmit={resetHandler} className="space-y-4">
          <h2>Reset Password</h2>
          <Input
            type="password"
            placeholder="Enter new Password"
            onChange={(e) => setNewPassword(e.target.value)}
            className={`${
              theme === "light"
                ? "border-gray-300 bg-white text-gray-900"
                : "border-gray-600 bg-gray-700 text-white"
            } w-full rounded-md border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />

          <div className="flex flex-col">
            <Button
              type="submit"
              className="w-full rounded-md bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Reset Password
            </Button>
            <Button
              onClick={onClose}
              className={`${theme === "light" ? "text-blue-600" : "text-blue-400"} transition hover:underline`}
            >
              Close
            </Button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </DialogPanel>
    </Dialog>
  );
};

export default ResetModal;
