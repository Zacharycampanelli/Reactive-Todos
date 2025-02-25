import { FC, useState } from "react";
import { Button, Field, Input, Label } from "@headlessui/react";
import { useTheme } from "../context/ThemeContext";
import { handleRegister } from "../../utils/auth";
import { useAuthContext } from "../context/AuthContext";

const RegisterModalBody: FC = () => {
  const { theme } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useAuthContext();

  const registerHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleRegister(name, email, password, setMessage, login);
  };

  return (
    <>
      <form className="space-y-4" onSubmit={registerHandler}>
        <Field>
          <Label
            className={`${theme === "light" ? "text-gray-700" : "text-gray-300"} mb-2 block text-sm font-medium`}
          >
            Name:
          </Label>
          <Input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            className={`${
              theme === "light"
                ? "border-gray-300 bg-white text-gray-900"
                : "border-gray-600 bg-gray-700 text-white"
            } w-full rounded-md border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
          />
        </Field>
        <Field>
          <Label
            className={`${theme === "light" ? "text-gray-700" : "text-gray-300"} mb-2 block text-sm font-medium`}
          >
            Email:
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
            required
          />
        </Field>
        <Field>
          <Label
            className={`${theme === "light" ? "text-gray-700" : "text-gray-300"} mb-2 block text-sm font-medium`}
          >
            Password:
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
            required
          />
        </Field>
        <Button
          type="submit"
          className="w-full rounded-md bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          Sign Up
        </Button>
      </form>
      {message && <p>{message}</p>}
    </>
  );
};

export default RegisterModalBody;
