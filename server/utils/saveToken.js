const Token = require('../models/Token');
const saveToken = async (userId, refreshToken, ip) => {
    const token = await Token.findOne({ user: userId });
    if (token) {
        token.token = refreshToken;
        token.ip = ip;
        return token.save();
    }
    return Token.create({ user: userId, token: refreshToken, ip });

};

module.exports = saveToken;