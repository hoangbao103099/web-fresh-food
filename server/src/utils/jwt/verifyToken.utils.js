import jwt from 'jsonwebtoken'
import key from '../../configs/secretKey.cjs'

export const verifyAccessToken = (req, res, next) => {
    const token = req.headers['authorization']

    if (!token) {
        res.status(401)
        throw new Error('Unauthorized.')
    }

    jwt.verify(token, key.jwt.jwt_access_secret, (err, payload) => {
        if (err) {
            if (err.name === 'JsonWebTokenError') {
                res.status(401)
                throw new Error('Unauthorized.')
            }
            return next(err)
        }
        req.payload = payload
        next()
    })
}

export const verifyRefreshToken = async (refreshToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, key.jwt.jwt_refresh_secret, (err, payload) => {
            if (err) {
                reject(err)
            }

            resolve(payload)
        })
    })
}
