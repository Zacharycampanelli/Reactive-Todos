import { Dispatch, FC, SetStateAction, useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { Button } from "@headlessui/react";

interface UserLinksProps {
  isAuthModalOpen: boolean;
  toggleAuthModal: () => void;
  setModalType: Dispatch<SetStateAction<"login" | "register">>;
}

const UserLinks: FC<UserLinksProps> = ({
  isAuthModalOpen,
  toggleAuthModal,
  setModalType,
}) => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { user, logout } = authContext;
  if (isAuthModalOpen) {
    return;
  }

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="absolute right-8 top-4 z-10 flex space-x-4 text-sm text-white">
      {user ? (
        <>
          <span>Welcome, {capitalize(user.name)}</span>
          <Button onClick={logout}>Logout</Button>
        </>
      ) : (
        <>
          <Button
            onClick={() => {
              toggleAuthModal();
              setModalType("login");
            }}
          >
            Log In
          </Button>
          <Button
            onClick={() => {
              toggleAuthModal();
              setModalType("register");
            }}
          >
            Register
          </Button>
        </>
      )}
    </div>
  );
};

export default UserLinks;
