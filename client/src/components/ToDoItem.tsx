import { FC } from "react";
import { Button, Checkbox, Input } from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Todo, useTodo } from "../context/ToDoContext";
interface ToDoItemProps {
  toDo: Todo;
}

const ToDoItem: FC<ToDoItemProps> = ({ toDo }) => {
  const { editTodo, removeTodo } = useTodo();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: toDo?.id ?? "default-id" });

  if (!toDo) return null;

  const style = { transition, transform: CSS.Transform.toString(transform) };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="not-last:border-b-[1px] border-dividerCircle tou relative grid w-full items-center border-solid"
    >
      <Input
        className={`bg-taskBox first:border-1 text-activeTask p-5 pl-[52px] first:rounded-xl first:border-solid first:border-white ${
          toDo?.completed
            ? "decoration-activeTask decoration-finishedTask text-finishedTask line-through"
            : ""
        } hover:cursor-pointer focus:outline-none`}
        name="todo_item"
        type="text"
        defaultValue={toDo?.title ?? ""}
        onBlur={(e) => {
          editTodo(toDo?.id, e.target.value, undefined);
        }}
      />

      <Checkbox
        checked={toDo?.completed}
        onChange={() => editTodo(toDo?.id, undefined, toDo?.completed)}
        className={`border-circle from-gradientStart to-gradientEnd text-finishedTask hover:border-gradientStart group absolute left-5 block size-5 rounded-[50%] border-[1px] bg-white hover:cursor-pointer data-[checked]:border-none data-[checked]:bg-gradient-to-br`}
      >
        <CheckIcon className="z-30 mx-auto my-auto h-4 w-4 stroke-white stroke-[4px] pt-1" />
      </Checkbox>

      <Button
        className={`absolute right-5`}
        onClick={() => removeTodo(toDo.id)}
      >
        <XMarkIcon className="stroke-activeTask z-30 mx-auto my-auto h-4 w-4 stroke-[3px] pt-1 hover:cursor-pointer" />
      </Button>
    </div>
  );
};

export default ToDoItem;
