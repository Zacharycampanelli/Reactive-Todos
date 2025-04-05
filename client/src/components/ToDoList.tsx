import { Button, Disclosure } from "@headlessui/react";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SELECT_OPTIONS } from "./ToDoContainer";
import SelectList from "./SelectList";
import ToDoItem from "./ToDoItem";
import { useMediaQuery } from "usehooks-ts";
import { useTodo } from "../context/ToDoContext";
import { v4 as uuid } from "uuid";

interface ToDoListProps {
  viewedTodos: string;
  setViewedTodos: Dispatch<SetStateAction<SELECT_OPTIONS>>;
}

const ToDoList: FC<ToDoListProps> = ({ viewedTodos, setViewedTodos }) => {
  const { todos, clearCompleted } = useTodo();
  const [todosLeft, setTodosLeft] = useState<number>(todos.length);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const filteredTodos = useMemo(() => {
    switch (viewedTodos) {
      case SELECT_OPTIONS.Completed:
        return todos.filter((todo) => todo.completed);
      case SELECT_OPTIONS.Active:
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  }, [viewedTodos, todos]);

  useEffect(() => {
    setTodosLeft(todos.filter((todo) => !todo.completed).length);
  }, [todos]);

  return (
    <SortableContext
      items={filteredTodos.map((todo) => todo.id)}
      strategy={verticalListSortingStrategy}
    >
      <Disclosure as="div" className="z-20 w-full">
        <div className="border-1 bg-taskBox flex w-full flex-col items-center rounded-xl border-solid border-white text-xs shadow-lg">
          {filteredTodos.map((todo) => (
            <ToDoItem toDo={todo} key={uuid()} />
          ))}
          <div className="text-primaryText border-1 bg-taskBox flex w-full items-center justify-between rounded-xl border-solid border-white px-5 py-4">
            <span className="w-1/3">
              {todosLeft} {todosLeft === 1 ? "item" : "items"} left{" "}
            </span>
            {!isMobile && (
              <div className="w-1/2">
                <SelectList setViewedTodos={setViewedTodos} />
              </div>
            )}
            <Button
              className="w-1/3 text-right"
              onClick={() => clearCompleted()}
            >
              Clear Completed
            </Button>
          </div>
        </div>
      </Disclosure>
    </SortableContext>
  );
};

export default ToDoList;
