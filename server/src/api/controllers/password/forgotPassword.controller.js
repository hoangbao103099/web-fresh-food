import asyncHandler from 'express-async-handler'
import crypto from 'crypto'
import key from '../../../configs/secretKey.cjs'
import User from '../../models/user.model.js'
import Token from '../../models/token.model.js'
import sendEmail from '../../../utils/sendEmail.util.js'

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email })

    if (!email) {
        res.status(400)
        throw new Error('Please add an email')
    }

    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }

    // delete token if it exists in db
    let token = await Token.findOne({ userID: user._id })
    if (token) {
        await Token.deleteOne()
    }

    // create reset token
    let resetToken = crypto.randomBytes(32).toString('hex') + user._id
    console.log(resetToken)
    // hash token
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    await new Token({
        userID: user._id,
        token: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * (60 * 100) // 30 minutes
    }).save()

    const resetUrl = `${key.server.client}/resetpassword/${resetToken}`

    const message = `
        <h2>Hello ${user.username}</h2>
        <p>Please click the url below to reset your password.</p>
        <p>This reset link is valid for only 30 minutes.</p>

        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

        <p>Regards...</p>
        <p>Seto Studio</p>
    `

    const subject = 'Password Reset Request'
    const send_to = user.email
    const sent_from = key.email.user

    try {
        await sendEmail(subject, message, send_to, sent_from)
        res.status(200).json({
            status: 'success',
            message: 'Reset email sent'
        })
    } catch (error) {
        res.status(500)
        throw new Error('Email not sent, please try again.')
    }
})

export default forgotPassword
