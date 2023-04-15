const CustomAPIError = require('./CustomAPIError');
const { StatusCodes } = require('http-status-codes');

class UnauthenticatedError extends CustomAPIError {
    constructor(msg) {
        super(msg, StatusCodes.UNAUTHORIZED);
    }

}

module.exports = UnauthenticatedError;