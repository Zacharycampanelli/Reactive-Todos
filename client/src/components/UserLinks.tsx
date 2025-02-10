import { Dispatch, FC, SetStateAction } from 'react';
import { Button } from '@headlessui/react';

interface ModalType {
    modalType: 'signin' | 'register';
}

interface UserLinksProps {
  isAuthModalOpen: boolean;
    toggleAuthModal: () => void;
    setModalType: Dispatch<SetStateAction<"login" | "register">>
}


const UserLinks:FC<UserLinksProps> = ({isAuthModalOpen, toggleAuthModal, setModalType}) => {
    if (isAuthModalOpen) {
     return;
    }
     
  return (
    <div className="absolute z-10 flex space-x-4 text-white top-4 right-8 text-sm">
        {/* TODO: Change based off of user's logged in status */}
      <Button onClick={() => {toggleAuthModal(); setModalType('login')}}>Login In</Button>
      <Button onClick={() => {toggleAuthModal(); setModalType('register')}}>Register</Button>
    </div>
  );
};

export default UserLinks;
