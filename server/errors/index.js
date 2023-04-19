const CustomAPIError = require('./CustomAPIError');
const NotFountError = require('./NotFoundError');
const BadRequestError = require('./BadRequestError');
const UnauthenticatedError = require('./UnauthenticatedError');
const PermissionError = require('./PermissionError');

module.exports = {
    CustomAPIError,
    NotFountError,
    BadRequestError,
    UnauthenticatedError,
    PermissionError,
};