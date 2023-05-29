import asyncHandler from 'express-async-handler'
import Post from '../../models/post.model.js'

const updatePost = asyncHandler(async (req, res) => {
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
        const { title, image } = post

        post.title = req.body.title || title
        post.image = req.body.image || image

        const updatedPost = await post.save()

        if (updatedPost) {
            res.status(200).json({
                status: 'success',
                data: {
                    title: updatedPost.title,
                    image: updatedPost.image
                }
            })
        } else {
            res.status(400)
            throw new Error('Invalid post data')
        }
    }
})

export default updatePost
