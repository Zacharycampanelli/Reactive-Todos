import sun from '../assets/images/icon-sun.svg';
import moon from '../assets/images/icon-moon.svg';
import { useTheme } from '../context/ThemeContext';

import ToDoList from './ToDoList';

import { useTodo } from '../context/ToDoContext';
import { v4 as uuidv4 } from 'uuid';
import ToDoForm from './ToDoForm';
import SelectList from './SelectList';
import { FC, useState } from 'react';
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
export enum SELECT_OPTIONS {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

const ToDoContainer: FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { todos, setTodos } = useTodo();
  const [viewedTodos, setViewedTodos] = useState<SELECT_OPTIONS>(SELECT_OPTIONS.All);

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
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex justify-between items-center py-3">
          <h1 className="font-josefin text-[40px] text-white tracking-[15px] z-0 ">TODO</h1>
          <img src={theme === 'light' ? moon : sun} alt="icon" onClick={toggleTheme} className="cursor-pointer z-10" />
        </div>
        <ToDoForm />
        <ToDoList viewedTodos={viewedTodos} />
        <SelectList setViewedTodos={setViewedTodos} />
      </div>
    </DndContext>
  );
};
export default ToDoContainer;
