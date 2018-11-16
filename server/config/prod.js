// prod.js - production keys here
// DO commit this file!

// Setup heroku env variables: Dashboard => settings => config vars
// or $ heroku config:set var:value
// get variables via console:
// $ heroku config
module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY
}