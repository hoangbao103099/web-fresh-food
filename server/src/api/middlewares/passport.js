import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
// import GooglePlusTokenStrategy from 'passport-google-plus-token'
import key from '../../configs/secretKey.cjs'
import User from '../models/user.model.js'
import generatedUsername from '../../utils/generateUsername.util.js'

GoogleStrategy.Strategy

passport.use(
    new GoogleStrategy(
        {
            clientID: key.oauth2.google.clientID,
            clientSecret: key.oauth2.google.clientSecret,
            callbackURL: '/api/v1/auth/google/callback',
            userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
            scope: ['email', 'profile']
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log('accessToken', accessToken)
                console.log('refreshToken', refreshToken)
                console.log('profile', profile)

                // check if user exists in database
                const user = await User.findOne({ authGoogleID: profile.id, provider: 'google' })

                if (user) {
                    return done(null, user)
                }

                // if new account
                const newUser = new User({
                    username: generatedUsername(profile),
                    email: profile.emails[0].value,
                    avatar: profile.photos[0].value,
                    firstname: profile.name.givenName,
                    lastname: profile.name.familyName,
                    provider: 'google',
                    authGoogleID: profile.id
                })
                await newUser.save()

                done(null, newUser)
            } catch (error) {
                done(error, false)
            }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})
