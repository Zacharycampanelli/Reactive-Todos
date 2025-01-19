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
    finishedTodos: Array<Todo>;
    unfinishedTodos: Array<Todo>;
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
      setTodos((prevTodos) =>{
        return prevTodos.map((todo) => {
            if (todo.key === todoKey) {
                return {...todo, isDone: !isDone}
            }
            return todo
        })}
      );
    };
  
    const removeTodo = (todoKey: string) => {
      setTodos((prevTodos) =>{
        return prevTodos.filter((todo) => todo.key !== todoKey)});
    };
  
    const finishedTodos = todos.filter((todo) => todo.isDone);
    const unfinishedTodos = todos.filter((todo) => !todo.isDone);
  
    return (
      <TodoContext.Provider
        value={{ todos, toggleTodo, addTodo, editTodo, removeTodo, finishedTodos, unfinishedTodos }}
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
