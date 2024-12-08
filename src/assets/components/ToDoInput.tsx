import { Checkbox, Input } from "@headlessui/react"
import { useState } from "react"

const ToDoInput = () => {
    const [isDone, setIsDone] = useState(false)
  return (
    <div className="grid w-full items-center gap-1.5 ">
      <Input className="bg-taskBox rounded-xl border border-solid border-taskBox" name="new_todo" type="text" placeholder="Create a new todo..." />
      <Checkbox checked={isDone}
      onChange={setIsDone}
      className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500">

      </Checkbox>
    </div>
  )
}

export default ToDoInput