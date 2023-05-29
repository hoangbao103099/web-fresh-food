import asyncHandler from 'express-async-handler'
import Post from '../../models/post.model.js'
import User from '../../models/user.model.js'

const getAllPosts = asyncHandler(async (req, res) => {
    const skip = req.query.skip ? Number(req.query.skip) : 0
    const DEFAULT_LIMIT = 10

    const posts = await Post.find().skip(skip).limit(DEFAULT_LIMIT).sort({ createdAt: -1 }).exec()

    if (posts) {
        const userID = posts.map((post) => post.userID)
        const users = await User.find({ _id: { $in: userID } }).select({
            password: 0,
            authGoogleID: 0,
            authGithubID: 0,
            provider: 0,
            role: 0
        })

        res.status(200).json({
            status: 'success',
            data: {
                postData: posts,
                userData: users
            }
        })
    } else {
        res.status(500)
        throw new Error('Server error')
    }
})

export default getAllPosts
