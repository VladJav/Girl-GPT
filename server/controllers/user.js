const User = require('../models/User');

const showCurrentUser = (req, res) => {

};

const getAllUsers = async (req, res) => {
    const { page = 1, limit = 20, sort = '', isActivated, name } = req.query;

    const queryObject = {};
    if (isActivated) {
        queryObject.isActivated = isActivated === 'true';
    }
    if (name) {
        queryObject.name = name;
    }
    const sortQuery = sort.split(',').join(' ');
    const skip = limit * (page - 1);

    const users = await User.find(queryObject).limit(limit).skip(skip).sort(sortQuery);

    const totalPages = Math.ceil(await User.countDocuments(queryObject) / limit);

    res.json({ users, count: users.length, totalPages, currentPage: +page });
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