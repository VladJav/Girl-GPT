const jwt = require('jsonwebtoken');

const generateTokens = (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
    
    return {
        accessToken,
        refreshToken,
    };
};

module.exports = generateTokens;