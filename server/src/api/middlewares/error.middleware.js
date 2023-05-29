import key from '../../configs/secretKey.cjs'
import log from './logger.middleware.cjs'

const errorHandler = (err, req, res, next) => {
    log.logEvents(
        `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
        'error.log'
    )
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode).json({
        status: 'fail',
        message: err.message,
        stack: key.server.node_env === 'development' ? err.stack : null
    })
}
export default errorHandler
