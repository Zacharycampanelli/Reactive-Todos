import { Button, Dialog, DialogPanel, Input } from '@headlessui/react';
import { useState } from 'react';
import { handleReset } from '../../utils/reset';

const ResetModal = ({ isOpen, onClose, token }) => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 size-full">
      <DialogPanel className="flex flex-col w-screen h-screen  mx-auto my-auto bg-white top-[50%] relative -translate-y-[50%] rounded-lg shadow-lg">
        <h2>Reset Password</h2>
        <Input type="password" placeholder="Enter new Password" onChange={(e) => setNewPassword(e.target.value)} />
        <Button onClick={() => handleReset(token, newPassword, setMessage, onClose)}>Reset Password</Button>
        <Button onClick={onClose}>Close</Button>
      </DialogPanel>
    </Dialog>
  );
};

export default ResetModal;
