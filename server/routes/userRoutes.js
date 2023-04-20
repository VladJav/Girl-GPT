const express = require('express');
const { getSingleUser, updateUser, getAllUsers, showCurrentUser, deleteUser } = require('../controllers/userController');
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');

const router = express.Router();

router.get('/', authenticateUser, authorizePermissions('admin'), getAllUsers);
router.get('/showMe', authenticateUser, showCurrentUser);
router.get('/:id', getSingleUser);
router.patch('/:id', authenticateUser, updateUser);
router.delete('/:id', authenticateUser, deleteUser);

module.exports = router;