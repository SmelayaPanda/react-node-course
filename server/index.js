const express = require('express');
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys')
// inside one node app can be several app instances
const app = express();

// https://console.developers.google.com
passport.use(
    new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        accessToken => {
            console.log(accessToken);
        })
);

app.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

// because heroku server can run many app one one machine,
// we use dynamic port binding form env variables
const PORT = process.env.PORT || 5000; // => for dev will be used 5000 port
app.listen(PORT)