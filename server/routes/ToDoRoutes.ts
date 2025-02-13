import express from 'express';
import { addToDo } from "../controllers/ToDoController";


const router = express.Router();

router.route('/').post(addToDo)

export default router;