import '../../middlewares/passport.js'
import express from 'express'
import passport from 'passport'
import key from '../../../configs/secretKey.cjs'
import register from '../../controllers/auth/register.controller.js'
import login from '../../controllers/auth/login.controller.js'
import logout from '../../controllers/auth/logout.controller.js'
import authGoogle from '../../controllers/auth/authGoogle.controller.js'
import loginStatus from '../../controllers/auth/loginStatus.controller.js'
import protect from '../../middlewares/auth.middleware.js'
import checkLoggedIn from '../../middlewares/checkLoggedIn.middleware.js'
import checkBlocked from '../../middlewares/block.middleware.js'
import limit from '../../middlewares/limit.middleware.js'
import { verifyAccessToken } from '../../../utils/jwt/verifyToken.utils.js'

const router = express.Router()

router.post('/register', checkLoggedIn, checkBlocked, limit.rateLimiter(10, 2 * 60 * 60), register)
router.post('/login', checkLoggedIn, checkBlocked, limit.rateLimiter(10, 2 * 60 * 60), login)
router.post('/logout', protect, verifyAccessToken, logout)
router.get('/loggedin', loginStatus)
router.get('/google/success', (req, res) => {
    if (req.user) {
        res.status(200).json({
            status: 'success',
            data: req.user
        })
    }
})
router.get('/google/fail', (_req, res) => {
    res.status(401).json({
        status: 'fail',
        message: 'Login failed'
    })
})
router.get(
    '/google',
    checkLoggedIn,
    limit.rateLimiter(5, 2 * 60 * 60),
    passport.authenticate('google', { scope: ['profile', 'email'] })
)
router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/google/fail'
    }),
    authGoogle
)

export default router
