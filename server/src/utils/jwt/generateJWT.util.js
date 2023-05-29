import jwt from 'jsonwebtoken'
import key from '../../configs/secretKey.cjs'

const encodedToken = (userID) => {
    return jwt.sign(
        {
            iss: 'Nguyen Duc',
            sub: userID,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 3)
        },
        key.ssl.privateKey,
        { algorithm: 'RS256' }
    )
}

export default encodedToken
