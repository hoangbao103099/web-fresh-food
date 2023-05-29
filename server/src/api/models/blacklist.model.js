import mongoose from 'mongoose'

const BlacklistSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    }
})

const Blacklist = mongoose.model('Blacklist', BlacklistSchema)

export default Blacklist
