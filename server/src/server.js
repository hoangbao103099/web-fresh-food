import 'express-async-errors'
import express from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import cors from 'cors'
import compression from 'compression'
import session from 'express-session'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import connectRedis from 'connect-redis'
import corsOption from './configs/cors/corsOption.js'
import key from './configs/secretKey.cjs'
import connectMongoDB from './configs/database/db.mongo.js'
import connectRedisDB from './configs/database/db.redis.js'
import authRoute from './api/routes/user/auth.route.js'
import userRoute from './api/routes/user/user.route.js'
import postRoute from './api/routes/post/post.route.js'
import passwordRoute from './api/routes/user/password.route.js'
import uploadFileRoute from './api/routes/upload/uploadFile.route.js'
import uploadImageRoute from './api/routes/upload/uploadImage.route.js'
import log from './api/middlewares/logger.middleware.cjs'
import limit from './api/middlewares/limit.middleware.js'
import checkWifiConnection from './api/middlewares/connection.middleware.js'
import errorHandler from './api/middlewares/error.middleware.js'

const redisStore = connectRedis(session)
const app = express()
const port = key.server.port || 5000

// middlewares
app.use(
    compression({
        level: 6,
        threshold: 100 * 1000,
        filter: (req, res) => {
            if (req.headers['x-no-compression']) {
                return false
            }
            return compression.filter(req, res)
        }
    })
)
if (key.server.node_env === 'development') {
    app.use(log.logger)
    app.use(morgan('dev'))
}
app.use(limit.BlacklistIp)
app.use(checkWifiConnection)
app.use(helmet())
app.use(cors(corsOption))
app.use((_req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site')
    next()
})
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(
    session({
        secret: key.session.SECRET_KEY,
        name: '_sess',
        saveUninitialized: false,
        resave: false,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: 'strict'
        },
        store: new redisStore({ client: connectRedisDB })
    })
)
app.use(passport.initialize())
app.use(passport.session())

// route
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/password', passwordRoute)
app.use('/api/v1/post', postRoute)
app.use('/api/v1/upload-image', uploadImageRoute)
app.use('/api/v1/upload-file', uploadFileRoute)

app.get('/', (_req, res) => {
    return res.status(200).send(key.server.node_env === 'development' ? 'Server is Ok 🚀' : '')
})

// apply error middleware (need to be at the bottom)
app.use(errorHandler)

connectMongoDB()
    .then(app.listen(port, console.log(`Server::: started at http://localhost:${port} ~ 🚀`)))
    .catch((error) => console.log(error))
