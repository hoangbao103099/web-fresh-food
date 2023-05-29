import asyncHandler from 'express-async-handler'
import User from '../../models/user.model.js'
import client from '../../../configs/database/db.redis.js'

// @desc Register
// @route POST /register
// @access Public
const register = asyncHandler(async (req, res) => {
    const { username, email, password, confirmpassword, firstname, lastname, gender, birthday } = req.body

    const blockedUser = async () => {
        const ip = req.ip || req.headers['x-forwarded-for']

        const attemps = await new Promise((resolve, reject) => {
            client.incr(`failed-register-attemps:${ip}`, (err, result) => {
                if (err) reject(err)

                if (result === 1) {
                    client.expire(`failed-register-attemps:${ip}`, 2 * 60 * 59, (error) => {
                        if (error) return next(error)
                    })
                }
                resolve(result)
            })
        })

        if (attemps > 7) {
            await new Promise((resolve, reject) => {
                client.set(`is-blocked:${ip}`, 'True', 'EX', 2 * 60 * 60, (err) => {
                    if (err) reject(err)
                    resolve()
                })
            })
        }
    }

    // validation
    if (!username || !email || !password || !confirmpassword || !firstname || !lastname) {
        res.status(400)
        throw new Error('Please fill in all the required fields.')
    }

    if (password.length < 6 || confirmpassword.length < 6) {
        res.status(400)
        throw new Error('Password must be up to 6 characters.')
    }

    if (confirmpassword !== password) {
        res.status(400)
        throw new Error('Password not match.')
    }

    // check if user already exists
    const userNameExists = await User.findOne({ username })
    const userEmailExists = await User.findOne({ email })

    if (userNameExists) {
        blockedUser()
        res.status(409)
        throw new Error('This username has been taken.')
    }

    if (userEmailExists) {
        blockedUser()
        res.status(409)
        throw new Error('This email has been taken.')
    }

    // create new user
    const user = await User.create({
        username,
        email,
        password,
        firstname,
        lastname,
        gender,
        birthday
    })

    if (user) {
        const { username, email, firstname, lastname, gender, birthday, role, avatar, bio } = user

        res.status(201).json({
            status: 'success',
            data: {
                username,
                email,
                firstname,
                lastname,
                gender,
                birthday,
                role,
                avatar,
                bio
            }
        })
    } else {
        blockedUser()
        res.status(400)
        throw new Error('Invalid user data.')
    }
})

export default register
