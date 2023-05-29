import asyncHandler from 'express-async-handler'
import { verifyRefreshToken } from '../../../utils/jwt/verifyToken.utils.js'
import { generateAccessToken } from '../../../utils/jwt/generateToken.util.js'

const refreshToken = asyncHandler(async (req, res) => {
    try {
        const currentToken = req.session.token

        if (!currentToken) {
            res.status(400)
            throw new Error('Not authorized, please login')
        }

        const { userID, userRole } = await verifyRefreshToken(currentToken)
        const newAccessToken = await generateAccessToken(userID, userRole)

        res.setHeader('Authorization', newAccessToken)
        res.json({
            accessToken: newAccessToken
        })
    } catch (error) {
        res.status(500)
        throw new Error('Server Error')
    }
})

export default refreshToken
