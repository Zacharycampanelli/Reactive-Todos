import express from "express";

import ToDoRoutes from "./ToDoRoutes";
import UserRoutes from "./UserRoutes";

const router = express.Router();

router.use("/users", UserRoutes);
router.use("/toDos", ToDoRoutes);
export default router;
