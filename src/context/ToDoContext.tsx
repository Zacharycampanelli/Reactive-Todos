import { createContext, ReactNode, useContext, useState } from 'react';

export type Todo = {
    title: string;
    isDone: boolean;
    key: string;
}

type TodoContextType = {
    todos: Array<Todo>;
    toggleTodo: (TodoKey: string) => void;
    addTodo: (Todo: Todo) => void;
    removeTodo: (TodoKey: string) => void;
    finishedTodos: Array<Todo>;
    unfinishedTodos: Array<Todo>;
  };
 
const TodoContext = createContext<TodoContextType | undefined>(undefined);

const TodoProvider = ({ children }: { children: ReactNode }) => {
    const [todos, setTodos] = useState<Array<Todo>>([]);
  
    const toggleTodo = (TodoKey: string) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.key === TodoKey ? { ...todo, isDone: !todo.isDone } : todo
        )
      );
    };
  
    const addTodo = (todo: Todo) => {
        console.log('here')
      setTodos((prevTodos) => [...prevTodos, todo]);
    };
  
    const removeTodo = (TodoKey: string) => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.key !== TodoKey));
    };
  
    const finishedTodos = todos.filter((todo) => todo.isDone);
    const unfinishedTodos = todos.filter((todo) => !todo.isDone);
  
    return (
      <TodoContext.Provider
        value={{ todos, toggleTodo, addTodo, removeTodo, finishedTodos, unfinishedTodos }}
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
