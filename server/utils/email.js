nodemailer = require('nodemailer');

const sendMail = async (options) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: 'ICTAK <ictak.id@gmail.com>',
        to: options.mail,
        subject: options.subject,
        html: options.message,
    });

}
module.exports = sendMail;