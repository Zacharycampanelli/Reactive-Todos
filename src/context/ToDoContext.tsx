import { createContext, ReactNode, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'

export type Todo = {
    title: string;
    isDone: boolean;
    key: string;
}

type TodoContextType = {
    todos: Array<Todo>;
    toggleTodo: (todoKey: string, isDone: boolean) => void;
    addTodo: (todoTitle: string) => void;
    editTodo: (todoKey: string, newText: string) => void;
    removeTodo: (todoKey: string) => void;
  };
 
  const TodoContext = createContext<TodoContextType | undefined>(undefined);
  
  const TodoProvider = ({ children }: { children: ReactNode }) => {
    const [todos, setTodos] = useState<Array<Todo>>([]);
 
    
  
    const addTodo = (todoTitle: string) => {
        setTodos((prevTodos) => {
            return [...prevTodos, {title: todoTitle, isDone: false, key: uuidv4()}]
        });
    }
    
    
    const editTodo = (todoKey: string, newText: string) => {
        setTodos((prevTodos) => {
            return prevTodos.map((todo) => {
                if (todo.key === todoKey) {
                    return {...todo, title: newText}
                }
                return todo
            })
            
        });
    }
    
    const toggleTodo = (todoKey: string, isDone: boolean) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.key === todoKey ? { ...todo, isDone: !todo.isDone } : todo
        )
      );
    };
  
    const removeTodo = (todoKey: string) => {
      setTodos((prevTodos) =>{
        return prevTodos.filter((todo) => todo.key !== todoKey)});
    };
  

    
    return (
      <TodoContext.Provider
        value={{ todos, toggleTodo, addTodo, editTodo, removeTodo }}
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
