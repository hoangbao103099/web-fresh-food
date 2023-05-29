import express from 'express'
import protect from '../../middlewares/auth.middleware.js'
import changePassword from '../../controllers/password/changePassword.controller.js'
import forgotPassword from '../../controllers/password/forgotPassword.controller.js'
import resetPassword from '../../controllers/password/resetPassword.controller.js'
import { validateParam } from '../../../validator/params.validator.js'
import { schemas } from '../../../validator/schemas.js'
import limit from '../../middlewares/limit.middleware.js'
import { verifyAccessToken } from '../../../utils/jwt/verifyToken.utils.js'

const router = express.Router()

router.put(
    '/change-password',
    protect,
    verifyAccessToken,
    limit.rateLimiter(1, 14 * 24 * 60 * 60),
    changePassword
)
router.post('/forgot-password', limit.rateLimiter(2, 5 * 60 * 60), forgotPassword)
router.put('/reset-password/:resetToken', validateParam(schemas.tokenSchema, 'resetToken'), resetPassword)

export default router
