const nodemailer = require('nodemailer');
const { nodemailerConfig } = require('./index');
const sendMail = async (to, subject, html) => {
    const transporter = nodemailer.createTransport(nodemailerConfig);
    const  info = await transporter.sendMail({
        from: `"Girl GPT👻" <${process.env.NODEMAILER_SENDER_EMAIL}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        html, // html body
    });
};

module.exports = sendMail;