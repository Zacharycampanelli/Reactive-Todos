import sun from '../assets/images/icon-sun.svg';
import moon from '../assets/images/icon-moon.svg';
import { useTheme } from '../context/ThemeContext';

import ToDoList from './ToDoList';

import { useTodo } from '../context/ToDoContext';
import { v4 as uuidv4 } from 'uuid';
import ToDoForm from './ToDoForm';
import SelectList from './SelectList';
import { FC, useState } from 'react';

export enum SELECT_OPTIONS  {
  All = 'All', Active = 'Active', Completed = 'Completed'
};


const ToDoContainer:FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { todos, addTodo } = useTodo();
  const [viewedTodos, setViewedTodos] = useState<SELECT_OPTIONS>(SELECT_OPTIONS.All);

  let icon = theme === 'light' ? moon : sun;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex justify-between items-center">
        <h1 className="font-josefin text-[40px] text-white tracking-[15px] z-0">TODO</h1>
        <img src={theme === 'light' ? moon : sun} alt="icon" onClick={toggleTheme} className="cursor-pointer z-10" />
      </div>
      <ToDoForm />
      {/* Render ToDoItem for newItem={true} />
      {/* Render the ToDoList */}
      <ToDoList viewedTodos={viewedTodos} />
      <SelectList setViewedTodos={setViewedTodos}/>
    </div>
  );
};
export default ToDoContainer;
