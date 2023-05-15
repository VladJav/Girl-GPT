const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const Token = require('../models/Token');
const { BadRequestError, UnauthenticatedError, NotFountError } = require('../errors');
const { sendMail, validateRefreshToken, generateTokensAndSetRefreshCookie } = require('../utils');
const { validateAccessToken } = require('../utils/jwt');


// TODO: When front-end will be ready, change CLIENT_URL and create a new HTML message in the email
const register = async (req, res) => {
    const { email, name, password } = req.body;

    // First created user is admin
    const role = await User.countDocuments({}) === 0 ? 'admin' : 'user';

    const isEmailAlreadyExists = await User.findOne({ email });
    if (isEmailAlreadyExists) {
        throw new BadRequestError(`User with email: ${email}, already exist`);
    }

    const activationCode = jwt.sign({ email: email }, process.env.JWT_SECRET);

    await User.create({ name, email, password, activationCode, role });

    await sendMail(email, 'Account Verification: GIRL GPT Auth ✔', `
                <h2>Please click on below link to activate your account</h2>
                <p>${process.env.CLIENT_URL}/activate-account/${activationCode}</p>
                <p><b>NOTE: </b> The above activation link expires in 30 minutes.</p>
                `);
    res.status(StatusCodes.ACCEPTED).json({ msg: 'Success! Check your email to verify account' });
};
const activateUser = async (req, res) => {
    const { token } = req.params;

    const { email } = validateAccessToken(token);
    
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
    const userAgent = req.headers['user-agent'];

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }
    
    const user = await User.findOne({ email });

    if (!user) {
        throw new UnauthenticatedError('Please provide correct credentials');
    }

    const isPasswordCorrect = await user.comparePasswords(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Please provide correct credentials');
    }

    if (user.isActivated === false) {
        throw new UnauthenticatedError('Please verify your email');
    }
    const { accessToken } = await generateTokensAndSetRefreshCookie(res, { user: user._id, role: user.role }, userAgent);
    res.json({ accessToken });
};

const logout = async (req, res) => {
    const { userId } = req.user;
    const token = await Token.findOneAndDelete({ user: userId });
    if (!token) {
        throw new UnauthenticatedError('You do not have valid refresh token');
    }

    res.cookie('refreshToken', '', {
        expires: new Date(Date.now() + 1),
        httpOnly: true,
    });

    res.sendStatus(StatusCodes.NO_CONTENT);

};

const refreshToken = async (req, res) => {
    const { refreshToken } = req.signedCookies;
    const payload = validateRefreshToken(refreshToken);
    const userAgent = req.headers['user-agent'];
    
    const token = await Token.findOne({ user: payload.user });
    if (!token) {
        throw new UnauthenticatedError('Token not found');
    }
    if (token.userAgent !== userAgent) {
        await Token.deleteOne({ _id:token._id });
        throw new UnauthenticatedError('Different user agent');
    }

    const { accessToken } = await generateTokensAndSetRefreshCookie(res, payload, userAgent);

    res.json({ accessToken });
};

// TODO: When front-end will be ready, change CLIENT_URL and create a new HTML message in the email
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
        throw new NotFountError('User not found');
    }
    
    const resetPasswordToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '10m' });
    user.resetCode = resetPasswordToken;
    await user.save();

    await sendMail(email, 'Forgot Password: GIRL GPT Auth ✔', `
                <h2>Please click on below link to reset your password</h2>
                <p>${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}</p>
                <p><b>NOTE: </b> The above activaton link expires in 10 minutes.</p>
                `);

    res.status(StatusCodes.ACCEPTED).json({ msg: 'Success! Check your email to reset password' });
};

// TODO: When front-end will be ready, finalize this function
const resetPassword = async (req, res) => {
    const { token: resetCode } = req.params;
    const { newPassword1, newPassword2 } = req.body;

    if (newPassword1 !== newPassword2) {
        throw new BadRequestError('Passwords are not the same');
    }
    const { email } = validateAccessToken(resetCode);

    const user = await User.findOne({ email });


    if (!user || user.resetCode !== resetCode) {
        throw new UnauthenticatedError('Bad Reset Token');
    }

    user.password = newPassword1;
    user.resetCode = '';
    await user.save();

    res.sendStatus(StatusCodes.OK);
};
module.exports = {
    register,
    activateUser,
    login,
    logout,
    refreshToken,
    forgotPassword,
    resetPassword,
};