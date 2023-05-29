import asyncHandler from 'express-async-handler'
import multer from 'multer'
import Jimp from 'jimp'

const upload = multer().single('file')

const uploadFile = asyncHandler(async (req, res) => {
    console.log(req.file)
    upload(req, res, (err) => {
        if (req.fileValidationError) {
            res.status(400).json(req.fileValidationError)
        } else if (!req.file) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please select an file to upload!'
            })
        } else if (err instanceof multer.MulterError) {
            return res.status(400).json({
                status: 'fail',
                message: err
            })
        } else {
            Jimp.read(req.file.path, (err, image) => {
                if (err) {
                    return res.send(err)
                }

                image.quality(100).write(req.file.path, (err) => {
                    if (err) {
                        res.status(400).json({
                            status: 'fail',
                            message: err.message
                        })
                    }

                    res.status(200).json({
                        status: 'success',
                        message: 'file upload to ' + req.file.path
                    })
                })
            })
        }
    })
})

export default uploadFile
