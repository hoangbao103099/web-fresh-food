import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
    {
        userID: {
            type: String,
            required: true
        },
        title: {
            type: String
        },
        like: [],
        heart: [],
        sad: [],
        wow: [],
        haha: [],
        angry: [],
        image: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
)

const Post = mongoose.model('Post', PostSchema)

export default Post
