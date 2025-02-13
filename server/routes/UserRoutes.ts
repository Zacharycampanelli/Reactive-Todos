import express from 'express';
import { register, login, forgottenPassword, resetPassword, getUser } from '../controllers/UserController';
import { authenticateUser } from '../middleware/authMiddleware';
const router = express.Router();

router.route('/').get(authenticateUser, getUser).post(register)
router.route ('/login').post(login);
router.route('/forgot').post(forgottenPassword);
router.route('/reset/:token').post(resetPassword);
export default router;