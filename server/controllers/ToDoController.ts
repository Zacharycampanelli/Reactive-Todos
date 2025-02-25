import { ToDo, User } from "../models";

export const getTodosByUser = async (req: any, res: any) => {
  try {
    const todos = await ToDo.find({ userId: req.user._id });

    res.status(200).json({ message: "To Dos retrieved successfully", todos });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Error fetching todos" });
  }
};

export const getSingleTodo = async (req: any, res: any) => {
  try {
    const toDo = await ToDo.findById(req.params.id);

    if (!toDo) {
      return res.status(404).json({ message: "To Do not found" });
    }

    res.status(200).json({ message: "To Do retrieved successfully", toDo });
  } catch (error) {
    console.error("🚨 Error fetching todo:", error);
    res.status(400).json({ message: error.message });
  }
};

export const addToDo = async (req: any, res: any) => {
  try {
    const { title, completed } = req.body;
    const userId = req.user._id;

    if (!title || typeof title !== "string") {
      return res.status(400).json({ message: "Title must be a string" });
    }

    const toDo = await ToDo.create({ title, completed, userId });

    await User.findByIdAndUpdate(userId, { $push: { toDos: toDo._id } });

    res.status(201).json({ message: "To Do added successfully", toDo });
  } catch (error) {
    console.error("🚨 Error adding todo:", error);
    res.status(400).json({ message: error.message });
  }
};

export const updateToDo = async (req: any, res: any) => {
  try {
    const { newText, completed } = req.body;
    const userId = req.user._id;

    if (!newText && completed === undefined) {
      throw res.status(400).json({ message: "No changes to make" });
    }
    const toDo = await ToDo.findOne({ _id: req.params.id, userId });

    if (!toDo) {
      return res.status(404).json({ message: "To Do not found" });
    }

    if (newText !== undefined) {
      toDo.title = newText;
    }

    if (completed !== undefined) {
      toDo.completed = completed;
    }

    await toDo.save();

    res.status(200).json({ message: "To Do updated successfully", toDo });
  } catch (error) {
    console.error("🚨 Error updating todo:", error);
    res.status(400).json({ message: error.message });
  }
};

export const deleteToDo = async (req: any, res: any) => {
  try {
    const userId = req.user._id;
    const { todoId } = req.params.id;
    const toDo = await ToDo.findOneAndDelete(todoId);

    if (!toDo) {
      return res.status(404).json({ message: "To Do not found" });
    }
    await User.findByIdAndUpdate(
      userId,
      { $pull: { todos: todoId } },
      { $pull: { toDos: toDo._id } },
    );

    res.status(200).json({ message: "To Do deleted successfully", toDo });
  } catch (error) {
    console.error("🚨 Error deleting todo:", error);
    res.status(400).json({ message: error.message });
  }
};
