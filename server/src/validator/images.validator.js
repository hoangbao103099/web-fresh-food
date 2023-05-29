const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only images file are allowed!'
        return cb(new Error('Only images file are allowed!'), false)
    }
    cb(null, true)
}

export default imageFilter
