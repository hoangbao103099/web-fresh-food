import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please enter a valid email.'
            ]
        },
        password: {
            type: String,
            minLength: [6, 'Password must be up to 6 characters.']
            // maxLength: [30, 'Password must be not more than 30 characters.']
        },
        confirmpassword: {
            type: String,
            minLength: [6, 'Password must be up to 6 characters.']
            // maxLength: [30, 'Password must be not more than 30 characters.']
        },
        firstname: {
            type: String
        },
        lastname: {
            type: String
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other']
        },
        birthday: {
            type: Date
        },
        followers: [],
        following: [],
        authGoogleID: {
            type: String,
            default: null
        },
        authGithubID: {
            type: String,
            default: null
        },
        provider: {
            type: String,
            enum: ['local', 'google', 'github', 'apple'],
            default: 'local'
        },
        role: {
            type: String,
            enum: ['admin', 'mod', 'user'],
            default: 'user'
        },
        avatar: {
            type: String,
            default: 'https://i.ibb.co/4pDNDk1/avatar.png'
        },
        cover: {
            type: String,
            default: null
        },
        bio: {
            type: String,
            maxLength: [250, 'Bio must not be more than 250 characters.'],
            default: null
        }
    },
    {
        timestamps: true
    }
)

UserSchema.set('toJSON', {
    transform: function (_doc, ret) {
        const date = new Date(ret.birthday)
        ret.birthday = date.toLocaleDateString()
        return ret
    }
})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
})

const User = mongoose.model('User', UserSchema)

export default User
