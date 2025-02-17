import { FC, useState } from 'react';
import { Button, Field, Input, Label } from '@headlessui/react';
import { useTheme } from '../context/ThemeContext';
import { handleRegister } from '../../utils/auth';
import { useAuthContext } from '../context/AuthContext';

interface RegisterModalBodyProps {
  onClose: () => void;
}

const RegisterModalBody: FC<RegisterModalBodyProps> = ({ onClose }) => {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
const { login } = useAuthContext();

  const registerHandler = (e) => {
    e.preventDefault();
    handleRegister(name, email, password, setMessage, login);
  };

  return (
    <>
      <form className="space-y-4" onSubmit={registerHandler}>
        <Field>
          <Label className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} block text-sm font-medium mb-2`}>
            Name:
          </Label>
          <Input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            className={`${
              theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
            }
                      w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
          />
        </Field>
        <Field>
          <Label className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} block text-sm font-medium mb-2`}>
            Email:
          </Label>
          <Input
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            className={`${
              theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
            }
                      w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
          />
        </Field>
        <Field>
          <Label className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} block text-sm font-medium mb-2`}>
            Password:
          </Label>
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className={`${
              theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'
            }
                      w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
          />
        </Field>
        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition"
        >
          Sign Up
        </Button>
      </form>
      {message && <p>{message}</p>}
    </>
  );
};

export default RegisterModalBody;
