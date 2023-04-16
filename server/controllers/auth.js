const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const { sendMail, generateTokens, saveToken } = require('../utils');

const register = async (req, res) => {
    const { email, name, password } = req.body;
    
    const isEmailAlreadyExists = await User.findOne({ email });
    if (isEmailAlreadyExists) {
        throw new BadRequestError(`User with email: ${email}, already exist`);
    }

    const activationCode = jwt.sign({ email: email }, process.env.JWT_SECRET);
    const CLIENT_URL = 'http://localhost:8000';
    await User.create({ name, email, password, activationCode });

    await sendMail(email, 'Account Verification: GIRL GPT Auth ✔', `
                <h2>Please click on below link to activate your account</h2>
                <p>${CLIENT_URL}/api/v1/auth/activate/${activationCode}</p>
                <p><b>NOTE: </b> The above activation link expires in 30 minutes.</p>
                `);
    res.json({ msg: 'Success! Check your email to verify account' });
};
const activateUser = async (req, res) => {
    const { token } = req.params;

    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findOne({ email });
    
    if (!user) {
        throw new UnauthenticatedError('Bad token');
    }

    user.isActivated = true;
    user.activationCode = '';

    await user.save();
    res.json({ msg: 'Email verified' });
};
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }
    
    const user = await User.findOne({ email });

    if (!user) {
        throw new UnauthenticatedError('Please provide correct credentials');
    }

    const isPasswordCorrect = await user.comparePasswords(password);
    console.log(password, user.password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Please provide correct credentials');
    }

    if (user.isActivated === false) {
        throw new UnauthenticatedError('Please verify your email');
    }

    const { refreshToken, accessToken } = generateTokens({ user: user._id, role: user.role });
    await saveToken(user._id, refreshToken, req.ip);
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('refreshToken', refreshToken, {
        expires: new Date(Date.now() + (oneDay * 30)),
        httpOnly: true,
        signed: true,
    });
    res.json({ accessToken });
};

const logout = (req, res) => {
    res.send('Logout');
};

module.exports = {
    register,
    activateUser,
    login,
    logout,
};