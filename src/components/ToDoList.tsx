import { useTimeout } from 'usehooks-ts';
import { useTodo } from '../context/ToDoContext';
import ToDoItem from './ToDoItem';
import { Disclosure, DisclosurePanel } from '@headlessui/react';
import { v4 as uuidv4 } from 'uuid';

const ToDoList = () => {
  const { todos, toggleTodo, removeTodo } = useTodo();

  return (
    <Disclosure as="div" className="z-20 w-full">
      <div className="w-full flex flex-col items-center rounded-xl border-solid border-white border-1 bg-taskBox">
        {todos.map((todo) => (
          <ToDoItem toDo={todo} key={todo.key} />
        ))}
      </div>
    </Disclosure>
  );
};

export default ToDoList;
