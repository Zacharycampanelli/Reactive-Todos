import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuthContext } from '../context/AuthContext';
import { handleLogin } from '../../utils/auth';

interface LoginModalBodyProps {
  setResetModalOpen: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
}

const LoginModalBody: FC<LoginModalBodyProps> = ({ setResetModalOpen, onClose }) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login } = useAuthContext();

  const loginHandler = async (e) => {
    e.preventDefault();
    await handleLogin(email, password, setMessage, onClose, login);
  };

  return (
    <>
      <form className="space-y-4" onSubmit={loginHandler}>
        <Field>
          <Label className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} block text-sm font-medium mb-2`}>
            Email Address
          </Label>
          <Input
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            className={`${
              theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
            }
                      w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </Field>
        <Field>
          <Label className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} block text-sm font-medium mb-2`}>
            Password
          </Label>
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className={`${
              theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
            }
                      w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </Field>
        <Field className="flex items-center justify-between">
          <Button
            onClick={() => {
              setResetModalOpen(true);
              onClose();
            }}
            className={`${theme === 'light' ? 'text-blue-600' : 'text-blue-400'} hover:underline transition`}
          >
            Forgot your password? Click here
          </Button>
        </Field>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
        >
          Log In
        </Button>
      </form>
      {message && <p>{message}</p>}
    </>
  );
};

export default LoginModalBody;
