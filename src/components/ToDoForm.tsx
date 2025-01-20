import { useState } from 'react';
import { useTodo } from '../context/ToDoContext';
import { v4 as uuidv4 } from 'uuid';
import { Field, Input } from '@headlessui/react';

const ToDoForm = () => {
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
    <Field className="relative grid w-full items-center mb-8">
      <Input 
       className={`bg-taskBox pl-[52px] rounded-xl border border-solid border-taskBox px-5 py-3 text-activeTask `}
              name="new_todo"
        type="text"
       placeholder={"Create a new todo..."}
        onKeyDown={handleEnter}
        />
    </Field>
  );
};

export default ToDoForm;
