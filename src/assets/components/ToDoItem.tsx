import { Todo } from "../../context/ToDoContext"

interface ToDoItemProps {
  toDo: Todo;
}

const ToDoItem: React.FC<ToDoItemProps> = ({toDo}) => {
  console.log(toDo)
  return (
    <div >
      {toDo.title}
    </div>
  )
}

export default ToDoItem


