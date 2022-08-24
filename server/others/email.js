nodemailer = require('nodemailer');

const sendMail = async (options) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ictak.id@gmail.com',//proc.env.email
            pass: 'egqozdmbzzsutphl' //proc.env.password
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