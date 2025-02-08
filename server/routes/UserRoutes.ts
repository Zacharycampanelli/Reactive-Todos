import express from 'express';
import { register } from '../controllers/UserController';

const router = express.Router();

router.route('/').post(register);

module.exports = router;