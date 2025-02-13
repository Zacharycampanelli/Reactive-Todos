import express from 'express';
import UserRoutes from './UserRoutes';
import ToDoRoutes from './ToDoRoutes';
const router = express.Router();


router.use('/users', UserRoutes);
router.use('/toDos', ToDoRoutes);
export default router;
