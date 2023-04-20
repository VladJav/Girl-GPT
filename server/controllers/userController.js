const UserController = require('../models/User');
const { checkPermissions } = require('../utils');
const { NotFountError, BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const showCurrentUser = async (req, res) => {
    const { userId } = req.user;

    const user = await UserController.findById(userId).select('-password -isActivated -activationCode -__v');

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

    const users = await UserController.find(queryObject).limit(limit).skip(skip).sort(sortQuery);

    const totalPages = Math.ceil(await UserController.countDocuments(queryObject) / limit);

    res.json({ users, count: users.length, totalPages, currentPage: +page });
};

const getSingleUser = async (req, res) => {
    const { id } = req.params;
    
    const user = await UserController.findById(id);
    if (!user) {
        throw new NotFountError('UserController not exists');
    }
    
    checkPermissions(req.user, user._id);
    
    res.json({ user });
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        throw new BadRequestError('Please provide name and email');
    }
    
    checkPermissions(req.user, id);

    const user = await UserController.findByIdAndUpdate(id, { name }, { new: true, runValidators: true });

    res.json({ user });
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    checkPermissions(req.user, id);

    const user = await UserController.findByIdAndDelete(id);
    if (!user) {
        throw new NotFountError('UserController not exists');
    }

    res.sendStatus(StatusCodes.NO_CONTENT);
};

module.exports = {
    showCurrentUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};