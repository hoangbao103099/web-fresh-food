import asyncHandler from 'express-async-handler'
import User from '../../models/user.model.js'

const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select({ password: 0 })
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export default getCurrentUser
