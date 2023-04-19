const { PermissionError } = require('../errors');
const checkPermissions = (requestUser, resourceUserId) => {
    if (requestUser.role === 'admin') {
        return;
    }
    if (requestUser.userId === resourceUserId) {
        return;
    }
    throw new PermissionError('You do not have enough permission');
};

module.exports = checkPermissions;