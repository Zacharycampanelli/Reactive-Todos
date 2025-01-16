import { useTimeout } from "usehooks-ts"
import { useTodo } from "../context/ToDoContext"
import ToDoItem from "./ToDoItem"
import { Disclosure } from "@headlessui/react"
import { v4 as uuidv4 } from 'uuid'

const ToDoList = () => {
    

    useTimeout(() => {
        console.log('Hello')
    } , 1000)

  return (
    <Disclosure>
    {todos.map((todo) => (
        <ToDoItem toDo={todo} key={todo.key}/>
    ))}  
    </Disclosure>
  )
}

export default ToDoList
