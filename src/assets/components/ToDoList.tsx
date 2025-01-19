import { useTimeout } from "usehooks-ts"
import { useTodo } from "../../context/ToDoContext"
import ToDoItem from "./ToDoItem"
import { Disclosure } from "@headlessui/react"

const ToDoList = () => {
    const { todos } = useTodo()

    useTimeout(() => {
        console.log('Hello')
    } , 1000)

  return (
    <Disclosure>
    {todos.map((todo) => (
        <ToDoItem toDo={todo} />
    ))}  
    </Disclosure>
  )
}

export default ToDoList
