const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const path = require('path')
const fsPromises = fs.promises

const logEvents = async (message, logFileName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try {
        const logsDirPath = path.join(process.cwd(), 'logs')
        const logsFolderPath = path.resolve(logsDirPath)

        if (!fs.existsSync(logsFolderPath)) {
            await fsPromises.mkdir(logsFolderPath, { recursive: true })
        }
        await fsPromises.appendFile(path.join(logsFolderPath, logFileName), logItem)
    } catch (error) {
        console.log(error)
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'request.log')
    console.log(`${req.method} ${req.path}`)
    next()
}

module.exports = { logEvents, logger }
