const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
    // Here user - mongoose model
    // this user.id is not the same as profile id below
    // this is shortcut of the mongo DB id of the record ("_id"."$old")
    // the reason of that we can making use of multiple different authentication providers for one user
    // and provider id used only for login
    // further app work will use only mongo id
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user))
})

// https://console.developers.google.com
passport.use(
    new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({googleId: profile.id})
            if (existingUser) {
                // first argument - error, second argument - used by passport to confirm founded user
                return done(null, existingUser)
            }
            // mongo model instance - represent a single record in collection
            const user = await new User({googleId: profile.id}).save() // save to Mongo
            done(null, user)
        })
);


// async await works for Node >= 8.0v