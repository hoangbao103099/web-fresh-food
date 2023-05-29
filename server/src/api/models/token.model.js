import mongoose from 'mongoose'

const TokenSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    common: {
        type: String,
        default: null,
        required: true
    }
})

const Token = mongoose.model('Token', TokenSchema)

setInterval(() => {
    Token.deleteMany({ common: null }, (err) => {
        if (err) throw err
        console.log('Document deleted')
    })
}, 7 * 24 * 60 * 60 * 1000) // 30 days

export default Token
