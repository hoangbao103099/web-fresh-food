import asyncHandler from 'express-async-handler'
import Blacklist from '../models/blacklist.model.js'
import client from '../../configs/database/db.redis.js'

const rateLimiter = (maxRequests, timeInterval) => {
    return (req, res, next) => {
        const route = req.route.path
        const ip = req.ip || req.headers['x-forwarded-for']
        const key = `rate-limit:${ip}:${route}`

        client.incr(key, (error, currentRequests) => {
            if (error) return next(error)

            if (currentRequests === 1) {
                client.expire(key, timeInterval, (error) => {
                    if (error) return next(error)
                })
            }

            if (currentRequests > maxRequests) {
                return res.status(503).json({
                    status: 'fail',
                    message: 'Somethings went wrong. Please try again later.'
                })
            }

            next()
        })
    }
}

const BlacklistIp = asyncHandler(async (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for']
    const key = `rate-limit:${ip}`

    const blockIp = await Blacklist.findOne({ ip: ip })

    if (blockIp) {
        return res.status(503).send('Service Unavailable')
    } else {
        client.incr(key, async (err, result) => {
            if (err) return next(err)

            if (result === 1) {
                client.expire(key, 900, (error) => {
                    if (error) return next(error)
                })
            }

            if (result >= 1000) {
                await new Blacklist({
                    ip: ip,
                    timestamp: new Date()
                }).save()
                return res.status(503).send('Service Unavailable.')
            }

            next()
        })
    }
})

export default {
    rateLimiter,
    BlacklistIp
}
