import { ToDo, User } from '../models';

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
