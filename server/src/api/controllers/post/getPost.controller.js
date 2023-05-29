import asyncHandler from 'express-async-handler'
import Post from '../../models/post.model.js'

const getPost = asyncHandler(async (req, res) => {
    const { postID } = req.value.params
    const post = await Post.findById(postID)
    if (post) {
        res.status(200).json({
            status: 'success',
            data: {
                post
            }
        })
    } else {
        res.status(404)
        throw new Error('Post not found')
    }
})

export default getPost
