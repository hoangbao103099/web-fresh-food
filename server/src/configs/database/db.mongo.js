import mongoose from 'mongoose'
import key from '../secretKey.cjs'

const connectMongoDB = async () => {
    try {
        mongoose.connect(key.db.mongodb)
        console.log('MongoDB::: connected ~ 🚀')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

mongoose.set('strictQuery', false)

export default connectMongoDB
