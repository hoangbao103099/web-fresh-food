import asyncHandler from 'express-async-handler'
import User from '../../models/user.model.js'

const getAllUser = asyncHandler(async (_req, res) => {
    try {
        const user = await User.find().select({ password: 0 })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

export default getAllUser
