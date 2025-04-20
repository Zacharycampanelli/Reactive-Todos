import { Button, Field, Input, Label } from "@headlessui/react";
import { Dispatch, FC, SetStateAction, useState } from "react";

import { useAuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { handleLogin } from "../utils/auth";
import { Spinner } from "./Spinner";

interface LoginModalBodyProps {
  setResetModalOpen: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
}

const LoginModalBody: FC<LoginModalBodyProps> = ({
  setResetModalOpen,
  onClose,
}) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { login } = useAuthContext();

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await handleLogin(email, password, setMessage, login);

      if (user) {
        onClose();
      }
    } catch (error) {
      setMessage("An error occurred during login. Please try again." +  "\n" + error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spinner />
        </div>
      ) : (
        <form className="space-y-4" onSubmit={loginHandler}>
          <Field>
            <Label
              className={`${theme === "light" ? "text-gray-700" : "text-gray-300"} mb-2 block text-sm font-medium`}
            >
              Email Address
            </Label>
            <Input
              type="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              className={`${
                theme === "light"
                  ? "border-gray-300 bg-white text-gray-900"
                  : "border-gray-600 bg-gray-700 text-white"
              } w-full rounded-md border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </Field>
          <Field>
            <Label
              className={`${theme === "light" ? "text-gray-700" : "text-gray-300"} mb-2 block text-sm font-medium`}
            >
              Password
            </Label>
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className={`${
                theme === "light"
                  ? "border-gray-300 bg-white text-gray-900"
                  : "border-gray-600 bg-gray-700 text-white"
              } w-full rounded-md border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </Field>
          <Field className="flex items-center justify-between">
            <Button
              onClick={() => {
                setResetModalOpen(true);
                onClose();
              }}
              className={`${theme === "light" ? "text-blue-600" : "text-blue-400"} transition hover:underline`}
            >
              Forgot your password? Click here
            </Button>
          </Field>

          <Button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Log In
          </Button>
        </form>
      )}
      {message && <p>{message}</p>}
    </>
  );
};
export default LoginModalBody;
