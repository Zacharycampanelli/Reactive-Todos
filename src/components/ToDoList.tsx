import { useTimeout } from 'usehooks-ts';
import { Todo, useTodo } from '../context/ToDoContext';
import ToDoItem from './ToDoItem';
import { Button, Disclosure, DisclosurePanel } from '@headlessui/react';
import { v4 as uuidv4 } from 'uuid';
import { FC, useEffect, useMemo, useState } from 'react';
import { SELECT_OPTIONS } from './ToDoContainer';

interface ToDoListProps {
  viewedTodos: string;
}

const ToDoList:FC<ToDoListProps> = ({viewedTodos}) => {
  const { todos, toggleTodo, removeTodo, clearCompleted } = useTodo();
const [todosLeft, setTodosLeft] = useState<number>(todos.length);


  const filteredTodos = useMemo(() => {
      switch (viewedTodos) {
          case SELECT_OPTIONS.Completed:
              return todos.filter((todo) => todo.isDone);
          case SELECT_OPTIONS.Active:
              return todos.filter((todo) => !todo.isDone);
          default:
              return todos;
      }
  }, [viewedTodos, todos]);

  useEffect(() => {
      setTodosLeft(todos.filter((todo) => !todo.isDone).length);
  }, [todos]);

      return (
    <Disclosure as="div" className="z-20 w-full">
      <div className="w-full flex text-xs flex-col items-center rounded-xl border-solid border-white border-1 bg-taskBox">
        {filteredTodos.map((todo) => (
          <ToDoItem toDo={todo} key={todo.key} />
        ))}
      <div className="w-full flex justify-between px-5 py-4 text-primaryText rounded-xl border-solid border-white border-1 bg-taskBox">
        {todosLeft} {todosLeft === 1 ? 'item' : 'items'} left <Button onClick={() => clearCompleted()}>Clear Completed</Button>
      </div>
      </div>
    </Disclosure>
  );
};

export default ToDoList;
