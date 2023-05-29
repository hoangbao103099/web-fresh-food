import nodemailer from 'nodemailer'
import key from '../configs/secretKey.cjs'

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
    const transporter = nodemailer.createTransport({
        host: key.email.host,
        port: key.email.port,
        auth: {
            user: key.email.user,
            pass: key.email.pass
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const options = {
        from: sent_from,
        to: send_to,
        replyTo: reply_to,
        subject: subject,
        html: message
    }

    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            console.log(info)
        }
    })
}

export default sendEmail
