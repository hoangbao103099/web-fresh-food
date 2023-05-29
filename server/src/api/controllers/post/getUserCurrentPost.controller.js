import asyncHandler from 'express-async-handler'
import Post from '../../models/post.model.js'

const getUserCurrentPost = asyncHandler(async (req, res) => {
    const skip = req.query.skip ? Number(req.query.skip) : 0
    const DEFAULT_LIMIT = 10
    const { userID } = req.body

    const posts = await Post.find({ userID: { $in: userID } })
        .skip(skip)
        .limit(DEFAULT_LIMIT)
        .sort({ createdAt: -1 })
        .exec()

    if (posts) {
        res.status(200).json({
            status: 'success',
            data: {
                posts
            }
        })
    } else {
        res.status(400)
        throw new Error('No posts found')
    }
})

export default getUserCurrentPost
