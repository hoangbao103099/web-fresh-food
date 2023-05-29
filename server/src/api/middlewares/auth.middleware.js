import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js'
import { verifyRefreshToken } from '../../utils/jwt/verifyToken.utils.js'

const protect = asyncHandler(async (req, res, next) => {
    try {
        const token = req.session.token

        if (!token) {
            res.status(401)
            throw new Error('Not Authorized, please login!')
        }

        // verify token
        const verified = await verifyRefreshToken(token)

        if (!verified) {
            res.status(500)
            throw new Error('Server error')
        }

        // get user id from token
        const user = await User.findById(verified.userID).select({ password: 0 })

        if (!user) {
            res.status(404)
            throw new Error('User not found')
        }

        req.user = user
        next()
    } catch (error) {
        res.status(401)
        throw new Error('Not Authorized, please login!')
    }
})

export default protect
