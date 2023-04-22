const express = require('express');
const { createMessage, getMessage } = require('../controllers/messageController');
const { authenticateUser } = require('../middleware/authentication');

const router = express.Router();

router.get('/:id', authenticateUser, getMessage);
router.post('/', authenticateUser, createMessage);

module.exports = router;