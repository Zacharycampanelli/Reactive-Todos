const express = require('express');
const { createUserProfile } = require('../controllers/UserController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', verifyToken, createUserProfile);

module.exports = router;