import sun from '../assets/images/icon-sun.svg'
import moon from '../assets/images/icon-moon.svg' 
import { useTheme } from '../context/ThemeContext'

import ToDoList from './ToDoList'
import ToDoInput from './ToDoInput'
import { useTodo } from '../context/ToDoContext'
import { v4 as uuidv4 } from 'uuid'

const ToDoContainer = () => {
  const { theme, toggleTheme } = useTheme()
  const { addTodo, toggleTodo, removeTodo, todos } = useTodo();
  

  const addNewTodo = (task: string) => {
    addTodo({
      title: task.trim(),
      isDone: false,
      key: uuidv4(),
    });
  };


  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newItem && addNewTodo) {
      const task = (e.target as HTMLInputElement).value.trim();
      console.log(task)
      if(task) {
        addNewTodo(task.trim());
        setTask('');
        (e.target as HTMLInputElement).value = ''; // Clear input
      }
    }
  };

  const handleFinishedTask = () => {
    if (toDo) {
      // setIsDone(!isDone);
      toggleTodo(toDo.key);
    }
  };


  let icon = theme === 'light' ? moon : sun
  
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex justify-between items-center">
        <h1 className="font-josefin text-[40px] text-white tracking-[15px] z-0">TODO</h1>
        <img src={theme === 'light' ? moon : sun} alt="icon" onClick={toggleTheme} className="cursor-pointer z-10" />
      </div>
      <ToDoInput newItem={true} addNewTodo={addNewTodo} />
      <ToDoList />
    </div>
  );
};
export default ToDoContainer
