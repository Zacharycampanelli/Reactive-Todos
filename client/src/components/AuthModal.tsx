import { Dialog, DialogPanel } from '@headlessui/react';
import { FC } from 'react';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  option: 'login' | 'signup';
}

const AuthModal: FC<AuthModalProps> = ({ open, onClose, option }) => {
  return (
    <Dialog
      className="fixed inset-0 flex items-center justify-center z-10 overflow-hidden origin-top transition-opacity duration-300 animate-fadeInDown"
      open={open}
      onClose={onClose}>
        <DialogPanel>
            <div className="flex flex-col items-center justify-center w-full h-full max-w-md p-4 bg-white rounded-2xl">
                <h1 className="text-2xl font-bold text-center text-primaryText">
                {option === 'login' ? 'Log in' : 'Sign up'}
                </h1>
                <form className="flex flex-col w-full mt-4">
                <label htmlFor="email" className="text-sm text-primaryText">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <label htmlFor="password" className="text-sm text-primaryText mt-4">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <button
                    type="submit"
                    className="w-full p-2 mt-4 text-white bg-primary rounded-md hover:bg-opacity-90">
                    {option === 'login' ? 'Log in' : 'Sign up'}
                </button>
                </form>
            </div>



        </DialogPanel>


      </Dialog>
  );
};

export default AuthModal;
