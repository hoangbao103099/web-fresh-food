import asyncHandler from 'express-async-handler'
import client from '../../configs/database/db.redis.js'

const handleBlockedUser = asyncHandler(async (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for']
    const blockedKey = `is-blocked:${ip}`

    const blocked = await new Promise((resolve, reject) => {
        client.get(blockedKey, (err, result) => {
            if (err) {
                console.error(err)
                reject(err)
            }
            resolve(result)
        })
    })

    if (blocked === 'True') {
        res.status(503)
        throw new Error('Your account has been temporarily blocked! Please try again later.')
    }

    next()
})

export default handleBlockedUser
