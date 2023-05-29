import asyncHandler from 'express-async-handler'
import { verifyRefreshToken } from '../../../utils/jwt/verifyToken.utils.js'

const loginStatus = asyncHandler(async (req, res) => {
    const token = req.session.token

    if (!token) {
        return res.status(400).json(false)
    }

    // verify token
    const verified = await verifyRefreshToken(token)

    if (verified) {
        return res.status(200).json(true)
    }

    return res.status(400).json(false)
})

export default loginStatus
