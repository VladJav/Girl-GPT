const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const { BadRequestError } = require('../errors');

const register = async (req, res) => {
    const { email, name, password } = req.body;
    
    const isEmailAlreadyExists = await User.findOne({ email });
    if (isEmailAlreadyExists) {
        throw new BadRequestError(`User with email: ${email}, already exist`);
    }

    const activationCode = jwt.sign({ email: email }, process.env.JWT_SECRET);

    const user = await User.create({ name, email, password, activationCode });

    const transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'apikey',
            pass: process.env.SENDGRID_API_KEY,
        },
    });
    const  info = await transporter.sendMail({
        from: '"Girl GPT👻" <hrom012k@gmail.com>', // sender address
        to: 'hrombp001@outlook.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>', // html body
    });
    res.send('Register');
};
const activateUser = (req, res) => {
    res.send('Verify email');
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