const express = require('express');
const { getSingleUser, updateUser, getAllUsers, showCurrentUser} = require('../controllers/user');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/showMe', showCurrentUser);
router.get('/:id', getSingleUser);
router.patch('/:id', updateUser);

module.exports = router;