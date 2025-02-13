import { Button, Dialog, DialogPanel, Input } from '@headlessui/react';
import { FC, useState } from 'react';
import { forgotPassword, handleReset } from '../../utils/reset';
import { useTheme } from '../context/ThemeContext';

interface ResetModalProps {
  isAuthModalOpen: boolean;
  onClose: () => void;
  token: string;
}

const ResetModal: FC<ResetModalProps> = ({ isAuthModalOpen, onClose, token }) => {
  const { theme } = useTheme();
  const [newPassword, setNewPassword] = useState('');
  const [enterEmail, setEnterEmail] = useState('');
  const [message, setMessage] = useState('');

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
      <Dialog open={isAuthModalOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <DialogPanel className={`relative w-[90%] max-w-md md:max-w-lg lg:max-w-xl p-6 md:p-8 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow-lg transition-all duration-300 transform scale-95`}>
          <form onSubmit={emailHandler} className="space-y-4 mx-8">
            <h2
              className={`text-2xl md:text-3xl font-semibold text-center mt-8  ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              } mb-6`}
            >
              Reset Password
            </h2>
            <Input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEnterEmail(e.target.value)}
              className={`${
                theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
              }
                      w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <div className="flex flex-col">

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
              >
              Get Reset Link
            </Button>
            <Button
              onClick={onClose}
              className={`${theme === 'light' ? 'text-blue-600' : 'text-blue-400'} hover:underline transition`}
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
    <Dialog open={isAuthModalOpen} onClose={onClose} className="fixed inset-0 z-50 size-full">
      <DialogPanel className="flex flex-col w-screen h-screen  mx-auto my-auto bg-white top-[50%] relative -translate-y-[50%] rounded-lg shadow-lg">
        <form onSubmit={resetHandler} className="space-y-4">
          <h2>Reset Password</h2>
          <Input
            type="password"
            placeholder="Enter new Password"
            onChange={(e) => setNewPassword(e.target.value)}
            className={`${
              theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
            }
                      w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />

          <div className="flex flex-col">
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
            >
              Reset Password
            </Button>
            <Button
              onClick={onClose}
              className={`${theme === 'light' ? 'text-blue-600' : 'text-blue-400'} hover:underline transition`}
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
