import { Button, Checkbox, Field, Input } from '@headlessui/react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Todo, useTodo } from '../context/ToDoContext';

interface ToDoItemProps {
  toDo?: Todo;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ toDo }) => {
  const { toggleTodo, editTodo, removeTodo } = useTodo();
  // const [isDone, setIsDone] = useState(toDo?.isDone || false);
  // const [isEditable, setIsEditable] = useState(newItem || false);
  // const [isNewItem, setIsNewItem] = useState(newItem || false);

  const handleFinishedTask = () => {
    if (toDo) {
      // setIsDone(!isDone);
      console.log(toDo);
      toggleTodo(toDo.key, toDo.isDone);
    }
  };

  return (
    <Field className="relative grid w-full items-center not-last:border-b-[1px]  border-solid border-dividerCircle">
      <Input
        className={`bg-taskBox  pl-[52px] first:rounded-xl first:border-solid first:border-white first:border-1  px-5 py-3 text-activeTask  ${
          toDo?.isDone ? 'line-through decoration-activeTask' : ''
        } focus:outline-none`}
        name="todo_item"
        type="text"
        defaultValue={toDo?.title}
        // onChange={(e) => setTask(e.target.value)}
        onChange={(e) => editTodo(toDo.key, e.target.value)}
        // onKeyDown={handleEnter}
        // onClick={() => setIsEditable(true)}
      />

      <Checkbox
        checked={toDo?.isDone}
        onChange={handleFinishedTask}
        className={`absolute left-5 group block rounded-[50%] border-[1px] border-circle size-5 bg-white text-primaryText 
        data-[checked]:bg-gradient-to-br from-gradientStart to-gradientEnd text-finishedTask border-none`}
      >
        <CheckIcon className="w-4 h-4  stroke-white stroke-[4px] z-30 mx-auto my-auto pt-1" />

      </Checkbox>
      <Button 
      className={`absolute right-5`}
      onClick={() => removeTodo(toDo.key)}>
        <XMarkIcon className="w-4 h-4 stroke-activeTask stroke-[3px] z-30 mx-auto my-auto pt-1" />
      </Button>
    </Field>
  );
};

export default ToDoItem;
