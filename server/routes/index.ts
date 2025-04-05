import ToDoRoutes from "./ToDoRoutes";
import UserRoutes from "./UserRoutes";
import express from "express";

const router = express.Router();

router.use("/users", UserRoutes);
router.use("/toDos", ToDoRoutes);
export default router;
