import express from 'express';

const router = express.Router();
const UserRoutes = require('./UserRoutes');
// router.use('/toDos', ToDoRoutes);
router.use('/users', UserRoutes);

export default router;
