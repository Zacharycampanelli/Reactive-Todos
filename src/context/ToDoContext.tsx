import { createContext, ReactNode, useContext, useState } from 'react';

type Todo = {
    title: string;
    isDone: boolean;
}

type TodoContextType = {
    Todos: Array<Todo>;
    toggleTodo: (TodoTitle: string) => void;
    addTodo: (Todo: Todo) => void;
    removeTodo: (TodoTitle: string) => void;
    finishedTodos: Array<Todo>;
    unfinishedTodos: Array<Todo>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const TodoProvider = ({ children }: { children: ReactNode}) => {
00

    const [Todos, setTodos] = useState<Array<Todo>>([]);

    const toggleTodo = (TodoTitle: string) => {
        setTodos((prevTodos) =>
            prevTodos.map((Todo) =>
                Todo.title === TodoTitle ? { ...Todo, isDone: !Todo.isDone } : Todo
            )
        );
    };

    const addTodo = (Todo: Todo) => {
        setTodos((prevTodos) => [...prevTodos, Todo]);
    }

    const removeTodo = (TodoTitle: string) => {
        setTodos((prevTodos) => prevTodos.filter((Todo) => Todo.title !== TodoTitle));
    }
    const finishedTodos = Todos.filter((Todo) => Todo.isDone);
    const unfinishedTodos = Todos.filter((Todo) => !Todo.isDone);


    return <TodoContext.Provider value={{ Todos, toggleTodo, addTodo, removeTodo, finishedTodos, unfinishedTodos }}>{children}</TodoContext.Provider>;
};


const useTodo = (): TodoContextType => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodo must be used within a TodoProvider');
    }
    return context;

};

export { TodoProvider, useTodo };
