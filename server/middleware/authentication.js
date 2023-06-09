const jwt = require('jsonwebtoken');
const { UnauthenticatedError, PermissionError } = require('../errors');
const { validateAccessToken } = require('../utils/jwt');

const authenticateUser = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) {
        throw new UnauthenticatedError('Please provide your access token');
    }

    const accessToken = bearerHeader.split(' ')[1];
    const { user, role } = validateAccessToken(accessToken);

    req.user = {
        role,
        userId: user,
    };

    next();
};

const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new PermissionError('You do not have enough permission');
        }
        next();
    };
};

module.exports = {
    authenticateUser,
    authorizePermissions,
};