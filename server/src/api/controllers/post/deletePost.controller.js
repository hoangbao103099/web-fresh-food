import asyncHandler from 'express-async-handler'
import Post from '../../models/post.model.js'

const deletePost = asyncHandler(async (req, res) => {
    const postId = req.params.postID
    const userID = req.user._id
    const post = await Post.findById(postId)

    if (!post) {
        res.status(404)
        throw new Error('Post not found')
    }

    if (post.userID != userID) {
        res.status(403)
        throw new Error("You don't have permission to change this post!")
    } else {
        await post.deleteOne()

        res.status(200).json({
            status: 'success',
            message: 'Post deleted successfully.'
        })
    }
})

export default deletePost
