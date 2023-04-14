class CustomAPIError extends Error {
    constructor(msg, statusCode) {
        super(msg);
        this.statuCode = statusCode;
    }

}

module.exports = CustomAPIError;