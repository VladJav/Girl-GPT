const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const { sendMail } = require('../utils');

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
    res.json({ user });
};
const login = (req, res) => {
    res.send('Login');
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