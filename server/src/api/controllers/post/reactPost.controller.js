import asyncHandler from 'express-async-handler'
import Post from '../../models/post.model.js'

const reactPost = asyncHandler(async (req, res) => {
    const { like, haha, sad, wow, angry } = req.body

    const postId = req.params.postID
    const userID = req.user._id
    const post = await Post.findById(postId)

    if (!post) {
        res.status(404)
        throw new Error('Post not found')
    }

    let reactionType, reactionArray

    switch (true) {
        case like === 'like':
            reactionType = 'like'
            reactionArray = post.like
            break
        case haha === 'haha':
            reactionType = 'haha'
            reactionArray = post.haha
            break
        case sad === 'sad':
            reactionType = 'sad'
            reactionArray = post.sad
            break
        case wow === 'wow':
            reactionType = 'wow'
            reactionArray = post.wow
            break
        case angry === 'angry':
            reactionType = 'angry'
            reactionArray = post.angry
            break
        default:
            res.status(400)
            throw new Error('Invalid reaction type.')
    }

    if (
        post.like.includes(userID) ||
        post.haha.includes(userID) ||
        post.sad.includes(userID) ||
        post.wow.includes(userID) ||
        post.angry.includes(userID)
    ) {
        // User has already reacted to the post
        if (reactionArray.includes(userID)) {
            // User already reacted with the same reaction type, so unlike the post
            await post.updateOne({ $pull: { [reactionType]: userID } })
            res.status(200).json({
                status: 'success',
                message: 'Post unliked.'
            })
        } else {
            // User reacted with a different reaction type, so update the reaction
            await post.updateOne({
                $pull: {
                    like: userID,
                    haha: userID,
                    sad: userID,
                    wow: userID,
                    angry: userID
                }
            })
            await post.updateOne({ $push: { [reactionType]: userID } })
            res.status(200).json({
                status: 'success',
                message: `Post reacted with ${reactionType}`
            })
        }
    } else {
        // User is reacting to the post for the first time
        await post.updateOne({ $push: { [reactionType]: userID } })
        res.status(200).json({
            status: 'success',
            message: `Post reacted with ${reactionType}`
        })
    }

    res.status(200)
    res.end()
})

export default reactPost
