const jwt = require('jsonwebtoken');
const Token = require('../models/Token');
const { MONTH } = require('../constants/time');
const { UnauthenticatedError } = require('../errors');
const generateTokens = (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

    return {
        accessToken,
        refreshToken,
    };
};
const saveToken = async (userId, refreshToken, userAgent) => {
    const token = await Token.findOne({ user: userId });
    if (token) {
        token.token = refreshToken;
        token.userAgent = userAgent;
        return token.save();
    }
    return Token.create({ user: userId, token: refreshToken, userAgent });

};

const validateAccessToken = (accessToken) => {
    try {
        return jwt.verify(accessToken, process.env.JWT_SECRET);
    }
    catch (e) {
        throw new UnauthenticatedError('Bad Token');
    }
};

const validateRefreshToken = (refreshToken) => {
    return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
};

const generateTokensAndSetRefreshCookie = async (res, payload, userAgent) => {
    const tokens = generateTokens({ user: payload.user, role: payload.role });
    await saveToken(payload.user, tokens.refreshToken, userAgent);

    res.cookie('refreshToken', tokens.refreshToken, {
        expires: new Date(Date.now() + MONTH),
        httpOnly: true,
        signed: true,
    });

    return tokens;
};

module.exports = {
    saveToken,
    generateTokensAndSetRefreshCookie,
    generateTokens,
    validateRefreshToken,
    validateAccessToken,
};