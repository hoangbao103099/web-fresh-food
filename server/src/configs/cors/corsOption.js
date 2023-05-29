import allowedOrigins from './allowedOrigin.js'

const corsOption = {
    origin: (origin, cb) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            cb(null, true)
        } else {
            cb(new Error('Not allowed by CORS.'))
        }
    },
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
    optionsSuccessStatus: 200
}

export default corsOption
