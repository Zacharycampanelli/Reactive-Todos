import { FC, useState } from 'react';
import { useTodo } from '../context/ToDoContext';
import { v4 as uuidv4 } from 'uuid';
import { Checkbox, Field, Input } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';

const ToDoForm:FC = () => {
  const { addTodo } = useTodo();
  const [task, setTask] = useState('');

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const task = (e.target as HTMLInputElement).value.trim();
      if (task) {
        addTodo(task.trim());
        setTask('');
        (e.target as HTMLInputElement).value = ''; // Clear input
      }
    }
  };

  return (
    <Field className="relative grid w-full items-center mb-6">
      <Input 
       className="bg-taskBox pl-[52px] text-xs rounded-xl border border-solid border-taskBox px-5 py-3 text-activeTask  focus:outline-none  hover:cursor-pointer"
              name="new_todo"
        type="text"
       placeholder={"Create a new todo..."}
        onKeyDown={handleEnter}
        />
        <Checkbox 
        disabled={true}
        className={`absolute left-5 group block rounded-[50%] border-[1px] border-circle size-5 bg-white hover:border-from-gradientStart`}
      >
        <CheckIcon className="w-4 h-4  stroke-white stroke-[4px] z-30 mx-auto my-auto pt-1" />

      </Checkbox>
    </Field>
  );
};

export default ToDoForm;
