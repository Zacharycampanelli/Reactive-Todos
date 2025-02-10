import { Button, Field, Input, Label } from "@headlessui/react"
import { Dispatch, FC, SetStateAction } from "react"

interface LoginModalBodyProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setResetModalOpen: Dispatch<SetStateAction<boolean>>;
}

const LoginModalBody:FC<LoginModalBodyProps> = ({onSubmit, setResetModalOpen}) => {
//TODO: Styling
    return (<>
    <form className="flex flex-col space-y-8 ">
            <Field>
                <Label className='w-[15%] inline-block '>Email Address</Label>
                <Input type="email" placeholder="Email Address" />
            </Field>
            <Field>
                <Label className='w-[15%] inline-block '>Password</Label>
                <Input type="password" placeholder="Password" />
            </Field>
            <Button  type='submit'>
                Log In
            </Button>
        </form>
        <Button onClick={() => setResetModalOpen(true)}>Forgot your password? Click here</Button>
    </>
  )
}

export default LoginModalBody
