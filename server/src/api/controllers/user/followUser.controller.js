import asyncHandler from 'express-async-handler'
import User from '../../models/user.model.js'

const followUser = asyncHandler(async (req, res) => {
    const { userID } = req.value.params
    const currentUser = req.user._id
    const followedUser = await User.findById(userID).select({ password: 0 })
    const followingUser = await User.findById(currentUser).select({ password: 0 })

    if (!followedUser) {
        res.status(404)
        throw new Error('User not found')
    }

    if (!followedUser.followers.includes(currentUser)) {
        await followedUser.updateOne({ $push: { followers: currentUser } })
        await followingUser.updateOne({ $push: { following: userID } })
        res.status(200).json({
            status: 'success',
            message: 'Followed.'
        })
    } else {
        await followedUser.updateOne({ $pull: { followers: currentUser } })
        await followingUser.updateOne({ $pull: { following: userID } })
        res.status(200).json({
            status: 'success',
            message: 'Unfollowed.'
        })
    }
})

export default followUser
