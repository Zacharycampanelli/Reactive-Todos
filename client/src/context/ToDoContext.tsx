import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  addToDoHandler,
  editToDoHandler,
  initialToDos,
  removeToDoHandler,
} from "../../utils/toDos";
import { useAuthContext } from "./AuthContext";

export type Todo = {
  title: string;
  completed: boolean;
  id: string;
};

type TodoContextType = {
  todos: Array<Todo>;
  setTodos?: React.Dispatch<React.SetStateAction<Todo[]>>;
  addTodo: (todo: Todo) => Promise<Todo | undefined>;
  editTodo: (
    todoid: string,
    newText: string | undefined,
    completed: boolean | undefined,
  ) => void;
  removeTodo: (todoid: string) => void;
  clearCompleted: () => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const { user } = useAuthContext();
  useEffect(() => {
    if (!user) {
      console.error("🚨 User not found");
      return;
    }

    const getInitialTodos = async () => {
      const storedTodos = await initialToDos();

      if (!storedTodos || !Array.isArray(storedTodos)) {
        console.error("🚨 Todos not in correct format:", storedTodos);
        return;
      }

      setTodos(
        storedTodos.map((todo) => ({
          title: todo.title,
          completed: todo.completed,
          id: todo._id,
        })),
      );
    };

    getInitialTodos();
  }, [user]);

  const addTodo = async (todo: {
    title: string;
    completed: boolean;
    id: string;
  }) => {
    if (!todo.title) {
      console.error("🚨 Title is required");
      return;
    }

    try {
      const newTodo = await addToDoHandler(todo.title, todo.completed, todo.id);
      if (!newTodo) return;

      setTodos((prevTodos) => [...prevTodos, todo]);
      return newTodo;
    } catch (error) {
      console.error("🚨 Error adding todo:", error);
    }
  };

  const editTodo = async (
    todoid: string,
    newText?: string,
    completed?: boolean,
  ) => {
    try {
      if (completed !== undefined) {
        completed = !completed;
      }

      const updatedTodo = await editToDoHandler(todoid, newText, completed);

      if (!updatedTodo) return;

      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === todoid) {
            return {
              ...todo,
              title: newText ?? todo.title,
              completed: completed ?? todo.completed,
            };
          }
          return todo;
        });
      });
    } catch (error) {
      console.error("🚨 Error updating todo:", error);
    }
  };

  const removeTodo = (todoid: string) => {
    if (!todoid) return;

    const removedTodo = removeToDoHandler(todoid);
    if (!removedTodo) return;
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== todoid);
    });
  };

  const clearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  const sortToDos = () => {
    todos.sort((a, b) => {
      if (a.completed && !b.completed) return 1;
      if (!a.completed && b.completed) return -1;
      return 0;
    })
  }
  sortToDos()

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        addTodo,
        editTodo,
        removeTodo,
        clearCompleted,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

const useTodo = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};

export { TodoProvider, useTodo };
