const { NotFountError } = require('../errors');
const notFoundMiddleware = (req, res, next) => {
    next(new NotFountError('Route does not exists'));
};

module.exports = notFoundMiddleware;