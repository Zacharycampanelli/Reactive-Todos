import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { initialToDos, addToDoHandler, removeToDoHandler } from '../../utils/toDos';

export type Todo = {
  title: string;
  isDone: boolean;
  id: string;
};

type TodoContextType = {
  todos: Array<Todo>;
  setTodos?: React.Dispatch<React.SetStateAction<Todo[]>>;
  setInitialTodos: ({ initialToDos }: { initialToDos: Array<Todo> }) => void;
  toggleTodo: (todoid: string, isDone: boolean) => void;
  addTodo: (todo: Todo  ) => Todo | null;
  editTodo: (todoid: string, newText: string) => void;
  removeTodo: (todoid: string) => void;
  clearCompleted: () => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Array<Todo>>([]);

  useEffect(() => {
    const getInitialTodos = async () => {
      const storedTodos = await initialToDos();
      console.log("🔍 Fetched Todos:", storedTodos);
  
      if (!storedTodos || !Array.isArray(storedTodos)) {
        console.error("🚨 Todos not in correct format:", storedTodos);
        return;
      }
  
      setTodos(storedTodos.map(todo => ({
        title: todo.title,
        isDone: todo.isDone,
        id: todo._id,  // ✅ Ensure `_id` is used as `id`
      })));
    };
  
    getInitialTodos();
  }, []);

  const setInitialTodos = (initialTodos: Array<Todo>) => {
    setTodos(() => {
      return [...todos];
    });
  };

  const addTodo = (todo: { title: string; isDone: boolean; id: string }) => {
    if (!todo.title) {
      console.error('🚨 Title is required');
      return;
    }

    try {
      const newTodo = addToDoHandler(todo.title, todo.isDone, todo.id);
      if (!newTodo) return;
console.log(newTodo)
      setTodos((prevTodos) => [...prevTodos, todo]);
    } catch (error) {
      console.error('🚨 Error adding todo:', error);
    }
  };

  const editTodo = (todoid: string, newText: string) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === todoid) {
          return { ...todo, title: newText };
        }
        return todo;
      });
    });
  };

  const toggleTodo = (todoid: string, isDone: boolean) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === todoid ? { ...todo, isDone: !todo.isDone } : todo)));
  };

  const removeTodo = (todoid: string) => {
    if(!todoid) return;
    
    const removedTodo = removeToDoHandler(todoid);
    if (!removedTodo) return;
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== todoid);
    });
  };

  const clearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.isDone));
  };

  return (
    <TodoContext.Provider
      value={{ todos, setTodos, setInitialTodos, toggleTodo, addTodo, editTodo, removeTodo, clearCompleted }}
    >
      {children}
    </TodoContext.Provider>
  );
};

const useTodo = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};

export { TodoProvider, useTodo };
