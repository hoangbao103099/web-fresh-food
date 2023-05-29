import asyncHandler from 'express-async-handler'
import key from '../../../configs/secretKey.cjs'
import { generateAccessToken, generateRefreshToken } from '../../../utils/jwt/generateToken.util.js'

const authGoogle = asyncHandler(async (req, res) => {
    console.log('hello')
    const accessToken = await generateAccessToken(req.user._id)
    const refreshToken = await generateRefreshToken(req.user._id)

    req.session.token = refreshToken
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: 'strict'
    })
    res.setHeader('Authorization', accessToken)
    res.redirect(key.server.client)
})

export default authGoogle
