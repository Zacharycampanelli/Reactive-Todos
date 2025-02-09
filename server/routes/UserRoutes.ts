import express from 'express';
import { register, login, forgottenPassword, resetPassword } from '../controllers/UserController';

const router = express.Router();

router.route('/').post(register)
router.route ('/login').post(login);
router.route('/forgot').post(forgottenPassword);
router.route('/reset/:token').post(resetPassword);
module.exports = router;