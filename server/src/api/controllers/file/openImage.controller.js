import fs from 'fs'

const openImage = (req, res) => {
    const imageName = 'uploads/images/' + req.query.image_name
    fs.readFile(imageName, (err, imageData) => {
        if (err) {
            res.json({
                status: 'fail',
                message: 'Cannot read image. Error: ' + err
            })
        } else {
            res.writeHead(200, { 'Content-Type': 'image/png' })
            res.end(imageData)
        }
    })
}

export default openImage
