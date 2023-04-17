const express = require('express');
const { register, logout, login, activateUser, refreshToken } = require('../controllers/auth');

const router = express.Router();

router.post('/register', register);
router.get('/activate/:token', activateUser);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.get('/logout', logout);

module.exports = router;