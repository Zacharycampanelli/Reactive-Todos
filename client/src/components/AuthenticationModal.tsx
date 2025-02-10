import { Button, Dialog, DialogPanel, DialogTitle, Fieldset } from '@headlessui/react';
import { Dispatch, FC, SetStateAction } from 'react';
import LoginModalBody from './LoginModalBody';
import RegisterModalBody from './RegisterModalBody';

interface AuthenticationModalProps {
  isOpen: boolean;
  toggleOpen: () => void;
  modalType: 'login' | 'register';
  setModalType: Dispatch<SetStateAction<"login" | "register">>
  setResetModalOpen: Dispatch<SetStateAction<boolean>>;
}

const AuthenticationModal: FC<AuthenticationModalProps> = ({ isOpen, toggleOpen, modalType, setModalType, setResetModalOpen }) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <Dialog open={isOpen} onClose={toggleOpen} className="fixed inset-0 z-50 h-screen">
      <DialogPanel className="flex flex-col w-screen h-screen md:w-[70%] md:h-[70%] mx-auto my-auto bg-white top-[50%] relative -translate-y-[50%] rounded-lg shadow-lg">
        <DialogTitle className="text-3xl text-center w-full my-16 md:my-8 block">
          {modalType === 'login' ? 'Log In' : 'Register'}
        </DialogTitle>
        <Fieldset className='mx-8'>
          {modalType === 'login' ? <LoginModalBody onSubmit={onSubmit} setResetModalOpen={setResetModalOpen} /> : <RegisterModalBody onSubmit={onSubmit} />}
        </Fieldset>
        <span className='mt-8 text-center'>

        {modalType === 'login' ? (<Button onClick={() => setModalType('register')}>New user? Sign up here</Button>) : (<Button onClick={() => setModalType('login')}>Already have an account? Log in here</Button>) }
        </span>
      </DialogPanel>

  <span onClick={() => toggleOpen()} className='absolute top-5 right-9'>x</span>
    </Dialog>
  );
};

export default AuthenticationModal;
