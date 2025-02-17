import { ToDo, User } from '../models';

export const getTodosByUser = async (req: any, res: any) => {
  try {
    const todos = await ToDo.find({ userId: req.user._id });
    res.status(200).json({ message: 'To Dos retrieved successfully', todos });
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
  res.status(500).json({ message: 'Error fetching todos' });
};

export const addToDo = async (req: any, res: any) => {
  try {
    const { title, completed, userId } = req.body;
    const toDo = await ToDo.create({ title, completed, userId });

    const user = await User.findById(userId);
    user.toDos.push(toDo._id);
    await user.save();
    res.status(201).json({ message: 'To Do added successfully', toDo });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
