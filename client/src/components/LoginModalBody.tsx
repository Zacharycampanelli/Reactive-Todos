import { Button, Field, Input, Label } from "@headlessui/react"
import { FC } from "react"

interface LoginModalBodyProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginModalBody:FC<LoginModalBodyProps> = () => {
//TODO: Styling
    return (
    <form className="flex flex-col space-y-8 ">
            <Field>
                <Label className='w-[15%] inline-block '>Email Address</Label>
                <Input type="email" placeholder="Email Address" />
            </Field>
            <Field>
                <Label className='w-[15%] inline-block '>Password</Label>
                <Input type="password" placeholder="Password" />
            </Field>
            <Button type='submit'>
                Log In
            </Button>
        </form>
  )
}

export default LoginModalBody
