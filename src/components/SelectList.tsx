import { FC } from "react";
import { SELECT_OPTIONS } from "./ToDoContainer"
import { Button, Field } from "@headlessui/react";
import { useTodo } from "../context/ToDoContext";

interface SelectListProps {
    setViewedTodos: (value: SELECT_OPTIONS) => void;
}

const SelectList:FC<SelectListProps> = ({setViewedTodos}) => {
        
  return (
    <Field className="w-full flex justify-around mt-4 py-4 px-20 items-center text-xs text-primaryText bg-taskBox rounded-xl">
      <Button onClick={() => setViewedTodos(SELECT_OPTIONS.All)}>All</Button>
        <Button onClick={() => setViewedTodos(SELECT_OPTIONS.Active) } >Active</Button>
        <Button onClick={() => setViewedTodos(SELECT_OPTIONS.Completed)} >Completed</Button>
    </Field>
  )
}

export default SelectList
 