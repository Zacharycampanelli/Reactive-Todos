import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { FC, useState } from "react";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import SelectList from "./SelectList";
import ToDoForm from "./ToDoForm";
import ToDoList from "./ToDoList";
import moon from "../assets/images/icon-moon.svg";
import sun from "../assets/images/icon-sun.svg";
import { useMediaQuery } from "usehooks-ts";
import { useTheme } from "../context/ThemeContext";
import { useTodo } from "../context/ToDoContext";

export enum SELECT_OPTIONS {
  All = "All",
  Active = "Active",
  Completed = "Completed",
}

const ToDoContainer: FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { todos, setTodos } = useTodo();
  const [viewedTodos, setViewedTodos] = useState<SELECT_OPTIONS>(
    SELECT_OPTIONS.All,
  );
  const isMobile = useMediaQuery("(max-width: 768px)");

  const getTodoPos = (id: UniqueIdentifier) =>
    todos.findIndex((todo) => todo.id == id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active?.id === over?.id) return;

    if (!todos) return;
    setTodos?.((prevTodos) => {
      const originalPos = getTodoPos(active?.id);
      const newPos = getTodoPos(over!.id);

      return arrayMove(prevTodos, originalPos, newPos);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor, { activationConstraint: { distance: 10 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div
        className={`${isMobile ? "w-full" : "w-[60%]"} mx-auto flex flex-col items-center justify-center`}
      >
        <div className="flex w-full items-center justify-between pb-8 pt-2">
          <h1 className="font-josefin z-0 text-[40px] tracking-[15px] text-white">
            TODO
          </h1>
          <img
            src={theme === "light" ? moon : sun}
            alt="icon"
            onClick={toggleTheme}
            className="z-10 cursor-pointer"
          />
        </div>
        <ToDoForm />
        <ToDoList viewedTodos={viewedTodos} setViewedTodos={setViewedTodos} />
        {isMobile ? <SelectList setViewedTodos={setViewedTodos} /> : ""}
      </div>
      <p className="text-primaryText pt-12 text-center text-sm">
        Drag and drop to reorder list
      </p>
    </DndContext>
  );
};
export default ToDoContainer;
