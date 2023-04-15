const express = require('express');
const { register, logout, login, activateUser } = require('../controllers/auth');

const router = express.Router();

router.post('/register', register);
router.post('/activate/:token', activateUser);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;