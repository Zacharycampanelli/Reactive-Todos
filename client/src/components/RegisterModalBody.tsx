import { FC } from 'react';
import { Button, Field, Input, Label } from '@headlessui/react';

interface RegisterModalBodyProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const RegisterModalBody: FC<RegisterModalBodyProps> = () => {
// TODO: Styling
  return (
    <form className="flex flex-col space-y-8">
      <Field>
        <Label className="w-[25%] inline-block text-dividerCircle">Name</Label>
        <Input className='bg-[#E3E4F1] rounded-md placeholder-white' type='text' placeholder='Name' />
      </Field>
      <Field>
        <Label className="w-[25%] inline-block">Email:</Label>
        <Input type="email" placeholder="Email Address" />
      </Field>
      <Field>
        <Label className="w-[25%] inline-block">Password:</Label>
        <Input type="password" placeholder="Password" />
      </Field>
      <Button  className="" type="submit">Register</Button>
    </form>
  );
};

export default RegisterModalBody;
