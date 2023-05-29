import dns from 'dns'

const checkWifiConnection = async (req, res, next) => {
    dns.lookup('google.com', (err) => {
        if (err) {
            return res.status(500).json({
                status: 'fail',
                message: 'No internet connection'
            })
        }
        next()
    })
}

export default checkWifiConnection
