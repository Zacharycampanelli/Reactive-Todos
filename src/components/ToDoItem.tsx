import { FC } from 'react';
import { Button, Checkbox, Field, Input } from '@headlessui/react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities'
import { Todo, useTodo } from '../context/ToDoContext';
import { Bars3Icon } from '@heroicons/react/24/solid';

interface ToDoItemProps {
  toDo?: Todo;
}

const ToDoItem:FC<ToDoItemProps> = ({ toDo }) => {
  const { toggleTodo, editTodo, removeTodo } = useTodo();
  const { attributes, listeners, setNodeRef, transform, transition} = useSortable({ id: toDo.id });

  const style = {transition, transform: CSS.Transform.toString(transform)};

  const handleFinishedTask = () => {
    if (toDo) {
      // setIsDone(!isDone);

      toggleTodo(toDo.id, toDo.isDone);
    }
  };

  return (
    <div ref={setNodeRef}  {...attributes} {...listeners} style={style} className="relative grid w-full items-center not-last:border-b-[1px] border-solid border-dividerCircle tou">
      <Input
        className={`bg-taskBox  pl-[52px] first:rounded-xl first:border-solid first:border-white first:border-1  px-5 py-3 text-activeTask  ${
          toDo?.isDone ? 'line-through decoration-activeTask decoration-finishedTask text-finishedTask' : ''
        } focus:outline-none hover:cursor-pointer`}
        name="todo_item"
        type="text"
        defaultValue={toDo?.title}
        // onChange={(e) => setTask(e.target.value)}
        onChange={(e) =>{e.stopPropagation(); editTodo(toDo?.id, e.target.value)}}
        // onKeyDown={handleEnter}
        // onClick={() => setIsEditable(true)}
      />

      <Checkbox
        checked={toDo?.isDone}
        onChange={handleFinishedTask}
        className={`absolute left-5 group block rounded-[50%] border-[1px] border-circle size-5 bg-white 
        data-[checked]:bg-gradient-to-br from-gradientStart to-gradientEnd text-finishedTask data-[checked]:border-none hover:border-gradientStart hover:cursor-pointer`}
      >
        <CheckIcon className="w-4 h-4  stroke-white stroke-[4px] z-30 mx-auto my-auto pt-1" />

      </Checkbox>
  
      <Button 
      className={`absolute right-5`}
      onClick={() => removeTodo(toDo.id)}>
        <XMarkIcon className="w-4 h-4 stroke-activeTask stroke-[3px] z-30 mx-auto my-auto pt-1 hover:cursor-pointer" />
      </Button>
    </div>
  );
};

export default ToDoItem;
