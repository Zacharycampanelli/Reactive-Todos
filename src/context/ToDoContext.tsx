import { createContext, ReactNode, useContext, useState } from 'react';

export type Todo = {
    title: string;
    isDone: boolean;
    key: string;
}

type TodoContextType = {
    todos: Array<Todo>;
    toggleTodo: (TodoTitle: string) => void;
    addTodo: (Todo: Todo) => void;
    removeTodo: (TodoTitle: string) => void;
    finishedTodos: Array<Todo>;
    unfinishedTodos: Array<Todo>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const TodoProvider = ({ children }: { children: ReactNode}) => {

    const [todos, setTodos] = useState<Array<Todo>>([]);

    const toggleTodo = (TodoTitle: string) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.title === TodoTitle ? { ...todo, isDone: !todo.isDone } : todo
            )
        );
    };

    const addTodo = (todo: Todo) => {
        setTodos((prevTodos) => [...prevTodos, todo]);
    }

    const removeTodo = (TodoTitle: string) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.title !== TodoTitle));
    }
    const finishedTodos = todos.filter((todo) => todo.isDone);
    const unfinishedTodos = todos.filter((todo) => !todo.isDone);


    return <TodoContext.Provider value={{ todos, toggleTodo, addTodo, removeTodo, finishedTodos, unfinishedTodos }}>{children}</TodoContext.Provider>;
};


const useTodo = (): TodoContextType => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodo must be used within a TodoProvider');
    }
    return context;

};

export { TodoProvider, useTodo };
