import asyncHandler from 'express-async-handler'
import client from '../../../configs/database/db.redis.js'

const logout = asyncHandler(async (req, res) => {
    try {
        const userID = req.user._id

        client.del(userID.toString(), (err, reply) => {
            if (err) {
                res.status(500)
                throw new Error('Server error')
            }
        })

        req.session.destroy()
        res.clearCookie('_sess')
        res.clearCookie('refreshToken')

        res.status(200).json({
            status: 'success',
            message: 'Logged out successfully.'
        })
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

export default logout
