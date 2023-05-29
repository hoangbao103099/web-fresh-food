import crypto from 'crypto'

// generate username with google sign-in option
// const generatedUsername = profile => {
//     const cryptoID = crypto.randomBytes(3).toString('hex')
//     const first_name = profile.name.givenName
//     const last_name = profile.name.familyName
//     const username = first_name + '.' + last_name + cryptoID
//     return username
// }

const generatedUsername = () => {
    const cryptoID = crypto.randomBytes(10).toString('base64url')
    const username = 'user' + '_' + cryptoID
    return username
}

export default generatedUsername
