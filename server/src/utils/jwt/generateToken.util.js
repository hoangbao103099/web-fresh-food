import jwt from 'jsonwebtoken'
import key from '../../configs/secretKey.cjs'

export const generateAccessToken = async (userID, userRole) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userID,
            userRole
        }

        const secret = key.jwt.jwt_access_secret
        const options = {
            expiresIn: key.jwt.access_token_time
        }

        jwt.sign(payload, secret, options, (err, token) => {
            if (err) reject(err)
            resolve(token)
        })
    })
}

export const generateRefreshToken = async (userID, userRole) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userID,
            userRole
        }

        const secret = key.jwt.jwt_refresh_secret
        const options = {
            expiresIn: key.jwt.refresh_token_time
        }

        jwt.sign(payload, secret, options, (err, token) => {
            if (err) reject(err)

            resolve(token)
        })
    })
}
