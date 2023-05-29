import express from 'express'
import protect from '../../middlewares/auth.middleware.js'
import createPost from '../../controllers/post/createPost.controller.js'
import getPost from '../../controllers/post/getPost.controller.js'
import getAllPost from '../../controllers/post/getAllPost.controller.js'
import updatePost from '../../controllers/post/updatePost.controller.js'
import deletePost from '../../controllers/post/deletePost.controller.js'
import reactPost from '../../controllers/post/reactPost.controller.js'
import { validateParam } from '../../../validator/params.validator.js'
import { schemas } from '../../../validator/schemas.js'
import limit from '../../middlewares/limit.middleware.js'
import { verifyAccessToken } from '../../../utils/jwt/verifyToken.utils.js'
import getUserCurrentPost from '../../controllers/post/getUserCurrentPost.controller.js'

const router = express.Router()

router.get('/posts', protect, verifyAccessToken, getAllPost)
router.post('/user-current-posts', getUserCurrentPost)
router.get('/:postID', validateParam(schemas.idSchema, 'postID'), getPost)
router.post('/create-post', protect, verifyAccessToken, limit.rateLimiter(20, 1 * 24 * 60 * 60), createPost)
router.put('/:postID', validateParam(schemas.idSchema, 'postID'), protect, verifyAccessToken, updatePost)
router.put('/:postID/like', validateParam(schemas.idSchema, 'postID'), protect, verifyAccessToken, reactPost)
router.delete('/:postID', validateParam(schemas.idSchema, 'postID'), protect, verifyAccessToken, deletePost)

export default router
