const CustomAPIError = require('./CustomAPIError');
const { StatusCodes } = require('http-status-codes');

class PermissionError extends CustomAPIError {
    constructor(msg) {
        super(msg, StatusCodes.FORBIDDEN);
    }

}

module.exports = PermissionError;