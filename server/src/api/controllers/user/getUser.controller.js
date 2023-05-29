import asyncHandler from 'express-async-handler'
import User from '../../models/user.model.js'

const getUser = asyncHandler(async (req, res) => {
    const { userID } = req.value.params
    const user = await User.findById(userID).select({ password: 0 })
    if (user) {
        res.status(200).json({
            status: 'success',
            data: user
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export default getUser
