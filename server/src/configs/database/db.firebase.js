import admin from 'firebase-admin'
import key from '../secretKey.cjs'
import serviceAccount from '../web-fresh-food.json' assert { type: 'json' }

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: key.db.firebase.bucketStore
})

const storage = admin.storage()

export default storage
