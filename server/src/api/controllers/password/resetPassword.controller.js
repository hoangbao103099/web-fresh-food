import asyncHandler from 'express-async-handler'
import crypto from 'crypto'
import Token from '../../models/token.model.js'
import User from '../../models/user.model.js'

const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body
    const { resetToken } = req.params

    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    const userToken = await Token.findOne({
        token: hashedToken,
        expiresAt: { $gt: Date.now() }
    })

    if (!userToken) {
        res.status(404)
        throw new Error('Invalid or expired token.')
    }

    const user = await User.findOne({ _id: userToken.userID })
    user.password = password
    await user.save()
    res.status(200).json({
        status: 'success',
        message: 'Password reset successfully, please login.'
    })
})

export default resetPassword
