const express = require('express');
const { register, logout, login, activateUser, refreshToken } = require('../controllers/auth');
const { authenticateUser } = require('../middleware/authentication');

const router = express.Router();

router.post('/register', register);
router.get('/activate/:token', activateUser);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.get('/logout', authenticateUser, logout);

module.exports = router;