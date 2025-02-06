import { Button } from '@headlessui/react';
import { Dispatch, FC, SetStateAction } from 'react';

interface ModalType {
    modalType: 'signin' | 'register';
}

interface UserLinksProps {
    isOpen: boolean;
    toggleOpen: () => void;
    setModalType: (modalType: 'signin' | 'register') => Dispatch<SetStateAction<ModalType>>;
}


const UserLinks:FC<UserLinksProps> = ({isOpen, toggleOpen, setModalType}) => {
    if (isOpen) {
     return;
    }
     
  return (
    <div className="absolute z-10 flex space-x-4 text-white top-4 right-4">
        {/* TODO: Change based off of user's logged in status */}
      <Button onClick={() => {toggleOpen(); setModalType('signin')}}>Sign In</Button>
      <Button onClick={() => {toggleOpen(); setModalType('register')}}>Register</Button>
    </div>
  );
};

export default UserLinks;
