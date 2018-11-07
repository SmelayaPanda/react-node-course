const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')
// https://console.developers.google.com
passport.use(
    new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({googleId: profile.id}).then(existingUser => {
                if (existingUser) {
                    // first argument - error, second argument - used by passport to confirm founded user
                    done(null, existingUser)
                } else {
                    new User({googleId: profile.id}) // mongo model instance - represent a single record in collection
                        .save() // save to Mongo
                        .then(user => done(null, user))
                }
            })

        })
);