import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import User from '../../models/user.model.js'

// @desc Delete
// @route DELETE /delete
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    const { password } = req.body
    if (!user) {
        res.status(404)
        throw new Error('User not found.')
    }

    if (!password) {
        res.status(400)
        throw new Error('Please enter your password.')
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password)

    if (user && passwordIsCorrect) {
        await user.deleteOne()
        req.session.destroy()
        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully'
        })
    } else {
        res.status(400)
        throw new Error('Password is incorrect.')
    }
})

export default deleteUser
