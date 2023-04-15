const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodemailerConfig');
const sendMail = (to, subject, html) => {
    const transporter = nodemailer.createTransport(nodemailerConfig);

    return transporter.sendMail({
        from: `"Girl GPT" <${process.env.NODEMAILER_SENDER_EMAIL}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        html, // html body
    });
};

module.exports = sendMail;