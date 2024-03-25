const nodemailer = require('nodemailer')

exports.mailSender = async (email, title, body) => {
    try {

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_CLIENT_INCOMING_SERVER_HOST,
            port: process.env.MAIL_CLIENT_SMTP_PORT,
            secure: process.env.MAIL_CLIENT_SSL,
            auth: {
                user: process.env.MAIL_CLIENT_USER_EMAIL,
                pass: process.env.MAIL_CLIENT_PASSWORD
            }
        })

        
        let info = await transporter.sendMail({
            from: `anchors.in - Admin <${process.env.MAIL_CLIENT_USER_EMAIL}>`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        })

        
        return info

    } catch (error) {
        console.log(error.message);
    }
}
