import express from "express";

import {
  addToDo,
  deleteToDo,
  getSingleTodo,
  getTodosByUser,
  updateToDo,
} from "../controllers/ToDoController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/user").get(authenticateUser, getTodosByUser);
router
  .route("/:id")
  .get(authenticateUser, getSingleTodo)
  .put(authenticateUser, updateToDo)
  .delete(authenticateUser, deleteToDo);
router.route("/").post(authenticateUser, addToDo);

export default router;
