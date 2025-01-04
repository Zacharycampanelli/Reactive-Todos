import { Checkbox, Field, Input } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Todo, useTodo } from '../context/ToDoContext';
import { v4 as uuidv4 } from 'uuid';

interface ToDoItemProps {
  toDo?: Todo;
  newItem?: boolean;
  addNewTodo?: (task: string) => void;

}

const ToDoItem: React.FC<ToDoItemProps> = ({ toDo, newItem, addNewTodo                                                                                              }) => {
  const { toggleTodo, addTodo } = useTodo();
  // const [isDone, setIsDone] = useState(toDo?.isDone || false);
  const [isEditable, setIsEditable] = useState(newItem || false);
  // const [isNewItem, setIsNewItem] = useState(newItem || false);
const [task, setTask] = useState('');
  // const addToList = (Task: string) => {
  //   if (Task.trim() !== '') {
  //     addTodo({
  //       title: Task.trim(),
  //       isDone: false,
  //       key: uuidv4(),
  //     });
  //     setIsNewItem(false);
  //   }
  // };

  
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newItem && addNewTodo) {
      const task = (e.target as HTMLInputElement).value.trim();
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

  return (
    <Field className="relative grid w-full items-center gap-1.5">
      <Input
        className={`bg-taskBox pl-[52px] rounded-xl border border-solid border-taskBox px-5 py-3 text-activeTask ${
          toDo?.isDone ? 'line-through decoration-activeTask' : ''
        } focus:outline-none`}
        name="new_todo"
        type="text"
        placeholder={newItem ? "Create a new todo..." : undefined}
        defaultValue={toDo?.title}
        onKeyDown={handleEnter}
        onClick={() => setIsEditable(true)}
      />
      {!newItem && (
        <Checkbox
          checked={toDo?.isDone}
          onChange={handleFinishedTask}
          className={`absolute left-5 group block rounded-[50%] border-[1px] border-circle size-5 bg-white text-primaryText ${
            toDo?.isDone ? 'bg-blue-500 text-finishedTask border-none' : ''
          }`}
        >
          <CheckIcon className="w-4 h-4 size-5 stroke-white stroke-[4px] z-30 mx-auto my-auto pt-1" />
        </Checkbox>
      )}
    </Field>
  );
};

export default ToDoItem;
