import asyncHandler from 'express-async-handler'
import User from '../../models/user.model.js'

const findUser = async (req, res) => {
    const { username } = req.body

    if (!username) {
        res.status(400)
        throw new Error('Please add username')
    }

    const user = await User.findOne({ username: username }).select({
        password: 0,
        role: 0,
        provider: 0,
        authGoogleID: 0,
        authGithubID: 0
    })

    if (!user) {
        res.status(404)
        throw new Error('User not found')
    } else {
        res.status(200).json({
            status: 'success',
            user
        })
    }
}

export default findUser
