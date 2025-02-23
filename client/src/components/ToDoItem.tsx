import { FC } from 'react';
import { Button, Checkbox, Input } from '@headlessui/react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Todo, useTodo } from '../context/ToDoContext';
interface ToDoItemProps {
  toDo: Todo;
}

const ToDoItem: FC<ToDoItemProps> = ({ toDo }) => {
  const { editTodo, removeTodo } = useTodo();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: toDo?.id ?? 'default-id' });

  if (!toDo) return null;

  const style = { transition, transform: CSS.Transform.toString(transform) };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="relative grid w-full items-center not-last:border-b-[1px] border-solid border-dividerCircle tou"
    >
      <Input
        className={`bg-taskBox  pl-[52px] first:rounded-xl first:border-solid first:border-white first:border-1  p-5 text-activeTask  ${
          toDo?.completed ? 'line-through decoration-activeTask decoration-finishedTask text-finishedTask' : ''
        } focus:outline-none hover:cursor-pointer`}
        name="todo_item"
        type="text"
        defaultValue={toDo?.title ?? ''}
        onBlur={(e) => {
          editTodo(toDo?.id, e.target.value, undefined);
        }}
      />

      <Checkbox
        checked={toDo?.completed}
        onChange={() => editTodo(toDo?.id, undefined, toDo?.completed)}
        className={`absolute left-5 group block rounded-[50%] border-[1px] border-circle size-5 bg-white 
        data-[checked]:bg-gradient-to-br from-gradientStart to-gradientEnd text-finishedTask data-[checked]:border-none hover:border-gradientStart hover:cursor-pointer`}
      >
        <CheckIcon className="w-4 h-4  stroke-white stroke-[4px] z-30 mx-auto my-auto pt-1" />
      </Checkbox>

      <Button className={`absolute right-5`} onClick={() => removeTodo(toDo.id)}>
        <XMarkIcon className="w-4 h-4 stroke-activeTask stroke-[3px] z-30 mx-auto my-auto pt-1 hover:cursor-pointer" />
      </Button>
    </div>
  );
};

export default ToDoItem;
