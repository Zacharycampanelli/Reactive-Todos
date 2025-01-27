import { createContext, ReactNode, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'

export type Todo = {
    title: string;
    isDone: boolean;
    id: string;
}

type TodoContextType = {
    todos: Array<Todo>;
    setTodos?: React.Dispatch<React.SetStateAction<Todo[]>>;
    toggleTodo: (todoid: string, isDone: boolean) => void;
    addTodo: (todoTitle: string) => void;
    editTodo: (todoid: string, newText: string) => void;
    removeTodo: (todoid: string) => void;
    clearCompleted: () => void;
  };
 
  const TodoContext = createContext<TodoContextType | undefined>(undefined);
  
  const TodoProvider = ({ children }: { children: ReactNode }) => {
    const [todos, setTodos] = useState<Array<Todo>>([]);
 
    
  
    const addTodo = (todoTitle: string) => {
        setTodos((prevTodos) => {
            return [...prevTodos, {title: todoTitle, isDone: false, id: uuidv4()}]
        });
    }
    
    
    const editTodo = (todoid: string, newText: string) => {
        setTodos((prevTodos) => {
            return prevTodos.map((todo) => {
                if (todo.id === todoid) {
                    return {...todo, title: newText}
                }
                return todo
            })
            
        });
    }
    
    const toggleTodo = (todoid: string, isDone: boolean) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoid ? { ...todo, isDone: !todo.isDone } : todo
        )
      );
    };
  
    const removeTodo = (todoid: string) => {
      setTodos((prevTodos) =>{
        return prevTodos.filter((todo) => todo.id !== todoid)});
    };
  
    const clearCompleted = () => {
      setTodos((prevTodos) => prevTodos.filter((todo) => !todo.isDone));  
    }
    
    return (
      <TodoContext.Provider
        value={{ todos, setTodos, toggleTodo, addTodo, editTodo, removeTodo, clearCompleted }}
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
