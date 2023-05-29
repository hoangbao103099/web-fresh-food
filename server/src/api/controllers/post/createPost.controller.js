import asyncHandler from 'express-async-handler'
import Post from '../../models/post.model.js'

const createPost = asyncHandler(async (req, res) => {
    const { title, image } = req.body
    const userID = req.user._id

    const post = await Post.create({
        userID,
        title: title,
        image: image
    })

    if (post) {
        const { userID, title, image } = post
        res.status(200).json({
            status: 'success',
            data: {
                userID,
                title,
                image
            }
        })
    } else {
        res.status(500)
        throw new Error('Invalid post data.')
    }
})

export default createPost
