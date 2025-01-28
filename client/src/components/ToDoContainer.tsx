import { FC, useState } from 'react';
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useTheme } from '../context/ThemeContext';
import { useTodo } from '../context/ToDoContext';
import ToDoList from './ToDoList';
import ToDoForm from './ToDoForm';
import SelectList from './SelectList';
import sun from '../assets/images/icon-sun.svg';
import moon from '../assets/images/icon-moon.svg';
import { useMediaQuery } from 'usehooks-ts';

export enum SELECT_OPTIONS {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

const ToDoContainer: FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { todos, setTodos } = useTodo();
  const [viewedTodos, setViewedTodos] = useState<SELECT_OPTIONS>(SELECT_OPTIONS.All);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const getTodoPos = (id) => todos.findIndex((todo) => todo.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) return;

    setTodos((prevTodos) => {
      const originalPos = getTodoPos(active.id);
      const newPos = getTodoPos(over.id);

      return arrayMove(prevTodos, originalPos, newPos);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {activationConstraint: {distance: 10}}),
    useSensor(TouchSensor, {activationConstraint: {distance: 10}}), 
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className={`${isMobile ? 'w-full' : 'w-[60%]'} flex flex-col items-center justify-center mx-auto`}>
        <div className="w-full flex justify-between items-center pt-2 pb-8">
          <h1 className="font-josefin text-[40px] text-white tracking-[15px] z-0">TODO</h1>
          <img src={theme === 'light' ? moon : sun} alt="icon" onClick={toggleTheme} className="cursor-pointer z-10" />
        </div>
        <ToDoForm />
        <ToDoList viewedTodos={viewedTodos} setViewedTodos={setViewedTodos} />
        {isMobile ? <SelectList setViewedTodos={setViewedTodos} /> : ''}
      </div>
      <p className='text-sm text-primaryText text-center pt-12'>Drag and drop to reorder list</p>
    </DndContext>
  );
};
export default ToDoContainer;
