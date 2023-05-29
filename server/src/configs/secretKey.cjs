const dotenv = require('dotenv')
const fs = require('fs')

dotenv.config()

const privateKey = fs.readFileSync(__dirname + '/ssl/private.pem')
const publicKey = fs.readFileSync(__dirname + '/ssl/public.crt')

module.exports = {
    server: {
        port: process.env.PORT,
        node_env: process.env.NODE_ENV,
        client: process.env.CLIENT_URL
    },
    jwt: {
        jwt_access_secret: process.env.JWT_ACCESS_SECRET,
        jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
        access_token_time: process.env.JWT_ACCESS_TIME,
        refresh_token_time: process.env.JWT_REFRESH_TIME
    },
    db: {
        mongodb: process.env.MONGODB_URL,
        redis: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        },
        firebase: {
            bucketStore: process.env.FIREBASE_BUCKET_STORAGE
        }
    },
    ssl: {
        privateKey,
        publicKey
    },
    session: {
        SECRET_KEY: process.env.SESSION_SECRET
    },
    oauth2: {
        google: {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        },
        github: {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }
    },
    email: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    roles: {
        admin: process.env.ADMIN_ROLE,
        mod: process.env.MOD_ROLE,
        user: process.env.USER_ROLE
    }
}
