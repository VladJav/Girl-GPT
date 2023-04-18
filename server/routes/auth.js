const express = require('express');
const { register, logout, login, activateUser, refreshToken, forgotPassword } = require('../controllers/auth');
const { authenticateUser } = require('../middleware/authentication');

const router = express.Router();

router.post('/register', register);
router.get('/activate/:token', activateUser);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.delete('/logout', authenticateUser, logout);
router.post('/forgot-password', forgotPassword);
module.exports = router;