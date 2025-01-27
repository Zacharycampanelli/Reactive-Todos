import { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Button, Disclosure } from '@headlessui/react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useTodo } from '../context/ToDoContext';
import ToDoItem from './ToDoItem';
import { SELECT_OPTIONS } from './ToDoContainer';
import { useMediaQuery } from 'usehooks-ts';
import SelectList from './SelectList';

interface ToDoListProps {
  viewedTodos: string;
  setViewedTodos: Dispatch<SetStateAction<SELECT_OPTIONS>>
}

const ToDoList:FC<ToDoListProps> = ({viewedTodos, setViewedTodos}) => {
  const { todos, clearCompleted } = useTodo();
  const [todosLeft, setTodosLeft] = useState<number>(todos.length);
  const isMobile = useMediaQuery('(max-width: 768px)');

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
      <SortableContext items={filteredTodos.map(todo => todo.id)} strategy={verticalListSortingStrategy}>

    <Disclosure as="div" className="z-20 w-full">
      <div className="w-full flex text-xs flex-col items-center rounded-xl border-solid border-white border-1 bg-taskBox shadow-lg">
        {filteredTodos.map((todo) => (
          <ToDoItem toDo={todo} id={todo.id} key={todo.id}/>
        ))}
      <div className="w-full flex justify-between items-center px-5 py-4 text-primaryText rounded-xl border-solid border-white border-1 bg-taskBox">
        <span className='w-1/3'>{todosLeft} {todosLeft === 1 ? 'item' : 'items'} left </span>
        {!isMobile && <div className="w-1/3"><SelectList setViewedTodos={setViewedTodos}/></div>}
        <Button className='w-1/3 text-right' onClick={() => clearCompleted()}>Clear Completed</Button>
      </div>
      </div>
    </Disclosure>
        </SortableContext>
  );
};

export default ToDoList;
