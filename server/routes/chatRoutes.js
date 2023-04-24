const express = require('express');
const { authenticateUser } = require('../middleware/authentication');
const { getSingleChat, updateChat, deleteChat, getAllChats, createChat } = require('../controllers/chatController');

const router = express.Router();

router.get('/', authenticateUser, getAllChats);
router.get('/:id', authenticateUser, getSingleChat);
router.post('/', authenticateUser, createChat);
router.patch('/:id', authenticateUser, updateChat);
router.delete('/:id', authenticateUser, deleteChat);

module.exports = router;
