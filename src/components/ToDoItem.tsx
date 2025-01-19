import { Checkbox, Field, Input } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Todo, useTodo } from '../context/ToDoContext';

interface ToDoItemProps {
  toDo?: Todo;

}

const ToDoItem: React.FC<ToDoItemProps> = ({ toDo }) => {
  const { toggleTodo, addTodo, editTodo, removeTodo } = useTodo();
  // const [isDone, setIsDone] = useState(toDo?.isDone || false);
  // const [isEditable, setIsEditable] = useState(newItem || false);
  // const [isNewItem, setIsNewItem] = useState(newItem || false);
const [task, setTask] = useState('');

  


  const handleFinishedTask = () => {
    if (toDo) {
      // setIsDone(!isDone);
      toggleTodo(toDo.key, toDo.isDone);
    }
  };

  return (
    <Field className="relative grid w-full items-center gap-1.5">
      <Input
        className={`bg-taskBox pl-[52px] rounded-xl border border-solid border-taskBox px-5 py-3 text-activeTask ${
          toDo?.isDone ? 'line-through decoration-activeTask' : ''
        } focus:outline-none`}
        name="todo_item"
        type="text"
       
        defaultValue={toDo?.title}
        // onKeyDown={handleEnter}
        // onClick={() => setIsEditable(true)}
      />
     
        <Checkbox
          checked={toDo?.isDone}
          onChange={handleFinishedTask}
          className={`absolute left-5 group block rounded-[50%] border-[1px] border-circle size-5 bg-white text-primaryText 
        data-[checked]:bg-gradient-to-br from-gradientStart to-gradientEnd text-finishedTask border-none`}       >
          <CheckIcon className="w-4 h-4 size-5 stroke-white stroke-[4px] z-30 mx-auto my-auto pt-1" />
        </Checkbox>
      
    </Field>
  );

};

export default ToDoItem;
