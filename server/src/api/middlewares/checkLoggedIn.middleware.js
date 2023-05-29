import asyncHandler from 'express-async-handler'

const checkLoggedIn = asyncHandler(async (req, res, next) => {
    const userSession = req.session.token

    if (userSession) {
        res.status(403)
        throw new Error('You have already logged in!')
    } else {
        next()
    }
})

export default checkLoggedIn
