const User = require('../models/User');
const { checkPermissions } = require('../utils');
const { NotFountError } = require('../errors');

const showCurrentUser = async (req, res) => {
    const { userId } = req.user;

    const user = await User.findById(userId).select('-password -isActivated -activationCode -__v');

    res.json({ user });
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

const getSingleUser = async (req, res) => {
    const { id } = req.params;
    
    const user = await User.findById(id);
    if (!user) {
        throw new NotFountError('User not exists');
    }
    
    checkPermissions(req.user, user._id);
    
    res.json({ user });
};

const updateUser = (req, res) => {
    
};

module.exports = {
    showCurrentUser,
    getAllUsers,
    getSingleUser,
    updateUser,
};