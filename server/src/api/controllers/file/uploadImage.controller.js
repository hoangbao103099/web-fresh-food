import asyncHandler from 'express-async-handler'
import multer from 'multer'
import Jimp from 'jimp'
import key from '../../../configs/secretKey.cjs'
import storage from '../../../configs/database/db.firebase.js'

const upload = multer().single('image')

const uploadImage = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        if (req.fileValidationError) {
            res.status(400).json(req.fileValidationError)
        } else if (!req.file) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please select an image to upload!'
            })
        } else if (err instanceof multer.MulterError) {
            return res.status(400).json({
                status: 'fail',
                message: err
            })
        } else {
            try {
                const bucket = storage.bucket()
                const image = req.file
                const imageName = `image-${Date.now()}.png`
                const file = bucket.file(imageName)

                const stream = file.createWriteStream({
                    metadata: {
                        contentType: image.mimetype
                    }
                })

                stream.on('error', (err) => {
                    console.log(err)
                    res.status(500).json({
                        status: 'fail',
                        message: err.message
                    })
                })
                stream.on('finish', async () => {
                    await file.makePublic()
                    req.file.firebaseUrl = `https://storage.googleapis.com/${key.db.firebase.bucketStore}/${imageName}`
                    res.status(200).json({
                        status: 'success',
                        message: 'Image uploaded successfully',
                        imageUrl: req.file.firebaseUrl
                    })
                })

                stream.end(image.buffer)
            } catch (error) {
                console.error(error)
                res.status(500).json({
                    status: 'fail',
                    message: error.message
                })
            }
        }
    })
})

export default uploadImage
