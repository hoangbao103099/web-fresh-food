import asyncHandler from 'express-async-handler'
import key from '../../../configs/secretKey.cjs'
import User from '../../models/user.model.js'

// @desc Update
// @route PUT /update
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { username, email } = req.body

    const user = await User.findById(req.user._id)
    const usernameExists = await User.findOne({ username })
    const emailExists = await User.findOne({ email })

    if (user) {
        const { username, email, firstname, lastname, gender, avatar, cover, bio } = user

        if (usernameExists) {
            res.status(400)
            throw new Error('This username has been taken.')
        } else {
            user.username = req.body.username || username
        }

        if (emailExists) {
            res.status(400)
            throw new Error('This email has been taken.')
        } else {
            user.email = req.body.email || email
        }

        if (req.body.avatar && req.body.avatar.length > 0) {
            user.avatar =
                `https://storage.googleapis.com/${key.db.firebase.bucketStore}/${req.body.avatar}` || avatar
        }

        if (req.body.cover && req.body.cover.length > 0) {
            user.cover =
                `https://storage.googleapis.com/${key.db.firebase.bucketStore}/${req.body.avatar}` || cover
        }

        user.firstname = req.body.firstname || firstname
        user.lastname = req.body.lastname || lastname
        user.gender = req.body.gender || gender
        user.bio = req.body.bio || bio

        const updatedUser = await user.save()

        if (updatedUser) {
            res.status(200).json({
                status: 'success',
                data: {
                    username: updatedUser.username,
                    email: updatedUser.email,
                    firstname: updatedUser.firstname,
                    lastname: updatedUser.lastname,
                    gender: updatedUser.gender,
                    avatar: updatedUser.avatar,
                    avatar: updatedUser.cover,
                    bio: updatedUser.bio
                }
            })
        } else {
            res.status(400)
            throw new Error('Invalid user data')
        }
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export default updateUser
