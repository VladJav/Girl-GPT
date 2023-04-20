const express = require('express');
const rateLimit = require('express-rate-limit');
const { register, logout, login, activateUser, refreshToken, forgotPassword, resetPassword } = require('../controllers/authController');
const { authenticateUser } = require('../middleware/authentication');
const { DAY } = require('../constants/time');

const router = express.Router();

const resetLimiter = rateLimit({
    windowMs: DAY,
    max: 5, // Limit each IP to 100 requests per `window` (here, per day)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

router.post('/register', register);
router.get('/activate/:token', activateUser);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.delete('/logout', authenticateUser, logout);
router.post('/forgot-password', resetLimiter, forgotPassword);
router.put('/reset-password/:token', resetPassword);

module.exports = router;