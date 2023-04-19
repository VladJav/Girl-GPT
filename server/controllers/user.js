const User = require('../models/User');

const showCurrentUser = (req, res) => {

};

const getAllUsers = async (req, res) => {
    const users = await User.find({});
    res.json({ users });
};

const getSingleUser = (req, res) => {

};

const updateUser = (req, res) => {
    
};

module.exports = {
    showCurrentUser,
    getAllUsers,
    getSingleUser,
    updateUser,
};