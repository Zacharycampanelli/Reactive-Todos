import { Dispatch, FC, SetStateAction, useContext } from 'react';
import { Button } from '@headlessui/react';
import { AuthContext } from '../context/AuthContext';

interface ModalType {
    modalType: 'signin' | 'register';
}

interface UserLinksProps {
  isAuthModalOpen: boolean;
    toggleAuthModal: () => void;
    setModalType: Dispatch<SetStateAction<"login" | "register">>
}


const UserLinks:FC<UserLinksProps> = ({isAuthModalOpen, toggleAuthModal, setModalType}) => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { user, logout } = authContext;
  if (isAuthModalOpen) {
    return;
  }
     
  return (
    <div className="absolute z-10 flex space-x-4 text-white top-4 right-8 text-sm">
      {user ? (<>
      <span>Welcome, {user.name}</span>
      <Button onClick={logout}>Logout</Button>
      </>) : (<>
      <Button onClick={() => {toggleAuthModal(); setModalType('login')}}>Log In</Button>
      <Button onClick={() => {toggleAuthModal(); setModalType('register')}}>Register</Button>
      </>)}     
    </div>
  );
};

export default UserLinks;
