import { FC, useState } from "react";
import { SELECT_OPTIONS } from "./ToDoContainer";
import { Button, Field } from "@headlessui/react";
import { useTodo } from "../context/ToDoContext";

interface SelectListProps {
  setViewedTodos: (value: SELECT_OPTIONS) => void;
}

const SelectList: FC<SelectListProps> = ({ setViewedTodos }) => {
  const [activePage, setActivePage] = useState(SELECT_OPTIONS.All);
  return (
    <Field className="text-primaryText bg-taskBox z-0 mt-4 flex w-full items-center justify-around rounded-xl px-20 py-4 text-xs md:mt-0 md:px-0 md:px-10 md:py-1">
      <Button
        className={`${
          activePage === SELECT_OPTIONS.All
            ? "text-currentPage"
            : "text-primaryText"
        } hover:text-activeTask`}
        onClick={() => (
          setActivePage(SELECT_OPTIONS.All), setViewedTodos(SELECT_OPTIONS.All)
        )}
      >
        All
      </Button>
      <Button
        className={`${
          activePage === SELECT_OPTIONS.Active
            ? "text-currentPage"
            : "text-primaryText"
        } hover:text-activeTask`}
        onClick={() => (
          setActivePage(SELECT_OPTIONS.Active),
          setViewedTodos(SELECT_OPTIONS.Active)
        )}
      >
        Active
      </Button>
      <Button
        className={`${
          activePage === SELECT_OPTIONS.Completed
            ? "text-currentPage"
            : "text-primaryText"
        } hover:text-activeTask`}
        onClick={() => (
          setActivePage(SELECT_OPTIONS.Completed),
          setViewedTodos(SELECT_OPTIONS.Completed)
        )}
      >
        Completed
      </Button>{" "}
    </Field>
  );
};

export default SelectList;
