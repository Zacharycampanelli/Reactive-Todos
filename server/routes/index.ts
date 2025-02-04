const router = express.Router();
const UserRoutes = require('./UserRoutes');
// router.use('/toDos', ToDoRoutes);
router.use('/users', UserRoutes);

module.exports = router;