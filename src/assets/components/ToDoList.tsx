import { useTimeout } from "usehooks-ts"
import { useTodo } from "../../context/ToDoContext"
import ToDoItem from "./ToDoItem"
import { Disclosure } from "@headlessui/react"
import { v4 as uuidv4 } from 'uuid'

const ToDoList = () => {
    const { todos,  toggleTodo, removeTodo } = useTodo()

    useTimeout(() => {
        console.log('Hello')
    } , 1000)

  return (
    <Disclosure>
    {todos.map((todo, index) => (
        <ToDoItem toDo={todo} key={uuidv4()}/>
    ))}  
    </Disclosure>
  )
}

export default ToDoList
