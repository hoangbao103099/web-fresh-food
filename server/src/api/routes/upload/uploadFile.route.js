import express from 'express'
import path from 'path'
import multer from 'multer'
import appRoot from 'app-root-path'
import uploadFile from '../../controllers/file/uploadFile.controller.js'
import protect from '../../middlewares/auth.middleware.js'
import { verifyAccessToken } from '../../../utils/jwt/verifyToken.utils.js'

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + '/uploads/files/')
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + Date.now() + ext)
    }
})

const upload = multer({ storage: storage, limits: { fileSize: 25 * 1024 * 1024 } })

router.post('/file', protect, verifyAccessToken, upload.single('file'), uploadFile)

export default router
