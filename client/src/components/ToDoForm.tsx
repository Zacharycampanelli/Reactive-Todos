import { Checkbox, Field, Input } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

import { useTodo } from "../context/ToDoContext";

const ToDoForm: FC = () => {
  const { addTodo } = useTodo();

  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const taskText = (e.target as HTMLInputElement).value.trim();
      if (!taskText) return;

      const toDoData = {
        title: taskText,
        completed: false,
        id: "",
      };
      const newTodo = await addTodo(toDoData);

      if (newTodo) {
        (e.target as HTMLInputElement).value = ""; // Clear input
      } else {
        console.error("🚨 Failed to add todo");
      }
    }
  };

  return (
    <Field className="relative mb-6 grid w-full items-center">
      <Input
        className="bg-taskBox border-taskBox text-activeTask rounded-xl border border-solid px-5 py-3 pl-[52px] text-xs hover:cursor-pointer focus:outline-none"
        name="new_todo"
        type="text"
        placeholder={"Create a new todo..."}
        onKeyDown={handleEnter}
      />
      <Checkbox
        disabled={true}
        className={`border-circle hover:border-from-gradientStart group absolute left-5 block size-5 rounded-[50%] border-[1px] bg-white`}
      >
        <CheckIcon className="z-30 mx-auto my-auto h-4 w-4 stroke-white stroke-[4px] pt-1" />
      </Checkbox>
    </Field>
  );
};

export default ToDoForm;
