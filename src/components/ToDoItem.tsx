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

  


  return (
    <Field>
      <Input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={handleEnter}
        placeholder="Create a new todo..."
        name="new_todo"
        type="text"
        placeholder={newItem ? "Create a new todo..." : undefined}
        defaultValue={toDo?.title}
      />
    </Field>
  );
};

export default ToDoItem;
