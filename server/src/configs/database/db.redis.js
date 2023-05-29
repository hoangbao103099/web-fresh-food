import redis from 'redis'
import key from '../secretKey.cjs'

const client = redis.createClient({
    host: key.db.redis.host,
    port: key.db.redis.port
})

client.on('connect', () => {
    console.log('Redis::: connected ~ 🚀')
})

client.on('error', (error) => {
    console.error(error)
})

export default client
