import { Button, Dialog, DialogPanel, Input } from '@headlessui/react';
import { useState } from 'react';
import { forgotPassword, handleReset } from '../../utils/reset';

const ResetModal = ({ isOpen, onClose, token }) => {
  const [newPassword, setNewPassword] = useState('');
  const [enterEmail, setEnterEmail] = useState('');
  const [message, setMessage] = useState('');

  const resetHandler = (e) => {
    e.preventDefault();
    handleReset(token, newPassword, setMessage, onClose);
  };

  const emailHandler = (e) => {
    e.preventDefault();
    forgotPassword(enterEmail, setMessage);
  }

  if(!token) return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 size-full">
      <DialogPanel className="flex flex-col w-screen h-screen  mx-auto my-auto bg-white top-[50%] relative -translate-y-[50%] rounded-lg shadow-lg">
      <form onSubmit={emailHandler}>
          <h2>Reset Password</h2>
          <Input type="email" placeholder="Enter your email" onChange={(e) => setEnterEmail(e.target.value)} />
          <Button type="submit">Get Reset Link</Button>
          <Button onClick={onClose}>Close</Button>
        </form>
        {message && <p>{message}</p>}
      </DialogPanel>
    </Dialog>
  )

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 size-full">
      <DialogPanel className="flex flex-col w-screen h-screen  mx-auto my-auto bg-white top-[50%] relative -translate-y-[50%] rounded-lg shadow-lg">
        <form onSubmit={resetHandler}>
          <h2>Reset Password</h2>
          <Input type="password" placeholder="Enter new Password" onChange={(e) => setNewPassword(e.target.value)} />
          <Button type="submit">Reset Password</Button>
          <Button onClick={onClose}>Close</Button>
        </form>
        {message && <p>{message}</p>}
      </DialogPanel>
    </Dialog>
  );
};

export default ResetModal;
