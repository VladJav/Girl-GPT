const express = require('express');
const { getSingleUser, updateUser, getAllUsers, showCurrentUser } = require('../controllers/user');
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');

const router = express.Router();

router.get('/', authenticateUser, authorizePermissions('admin'), getAllUsers);
router.get('/showMe', authenticateUser, showCurrentUser);
router.get('/:id', getSingleUser);
router.patch('/:id', updateUser);

module.exports = router;