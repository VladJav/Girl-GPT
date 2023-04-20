const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');
const errorHandler = (err, req, res, next) => {

    if (err instanceof mongoose.Error.CastError) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: `No item found with id: ${err.value}` });
        return;
    }
    res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        msg: err.message || 'Something went wrong try again later',
    });
};

module.exports = errorHandler;