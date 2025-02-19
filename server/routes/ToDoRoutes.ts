import express from 'express';
import { getTodosByUser, addToDo, deleteToDo, getSingleTodo, updateToDo } from '../controllers/ToDoController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/user').get(authenticateUser, getTodosByUser);
router.route('/:id').get(getSingleTodo).put(updateToDo).delete(deleteToDo);
router.route('/').post(addToDo);

export default router;
