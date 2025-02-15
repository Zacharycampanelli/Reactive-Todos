import express from 'express';
import { addToDo } from "../controllers/ToDoController";
import { getTodosByUser } from "../controllers/ToDoController";
import { authenticateUser } from "../middleware/authMiddleware";


const router = express.Router();

router.route('/user').get(authenticateUser, getTodosByUser);
router.route('/').post(addToDo)

export default router;