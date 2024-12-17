import { Checkbox, Input } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useTodo } from '../../context/ToDoContext';

const ToDoInput = () => {
  const { toggleTodo, addTodo } = useTodo();
  const [isDone, setIsDone] = useState(false);

const addToList = (Task: string) => {
  if (Task.trim() !== '') {
    addTodo({
      title: Task,
      isDone: isDone,
    });
    setIsDone(false);
}
}
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const Task = (e.target as HTMLInputElement).value;
      addToList(Task);
      (e.target as HTMLInputElement).value = '';
    }
  };

  return (
    <div className="relative grid w-full items-center gap-1.5 ">
      <Input
        className={`bg-taskBox pl-[52px] rounded-xl border border-solid border-taskBox px-5 py-3 text-activeTask' ${isDone && `line-through decoration-activeTask`} focus:outline-none ` }
        name="new_todo"
        type="text"
        placeholder="Create a new todo..."
        onKeyDown={handleEnter}
      />
      <Checkbox
        checked={isDone}
        onChange={setIsDone}
        className={`absolute left-5 group block rounded-[50%] border-[1px] border-circle size-5 bg-white text-primaryText ${
          isDone && `bg-blue-500 text-finishedTask border-none`
        }`}
      >
        <CheckIcon className="w-4 h-4 size-5 stroke-white stroke-[4px] z-30 mx-auto my-auto pt-1 " />
      </Checkbox>
    </div>
  );
};

export default ToDoInput;
