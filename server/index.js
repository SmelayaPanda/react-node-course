const express = require('express');
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const keys = require('./config/keys')
require('./models/User') // before passport because it used model
require('./services/passport')

mongoose.connect(keys.mongoURI)

// inside one node app can be several app instances
const app = express();

app.use(bodyParser.json())
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // how long this cookie can exists in the browser before it is automatically expired for us
        keys: [keys.cookieKey] // any random array of string for used for sign/encrypt cookie (pick automatically any from array)
    })
)
app.use(passport.initialize())
app.use(passport.session())

require('./routes/auth')(app)
require('./routes/billing')(app)

if (process.env.NODE_ENV === 'production') {
    /*
        Express will serve up the production assets like our main.js / main.css files.
        If any get request comes in for some routes or some file or absolutely
        anything to our application and we do not understand what it's looking for -> use assets directory
    */
    app.use(express.static('client/build')) // !!!

    /*
        Express will serve up index.html file if it doesn't recognise the route.
        So when a request comes into express express we'll first check to see if there is some specific file
        that matches up with what that request is looking for.
        If there is it's going to answer the request with this line right here if there's not express will
        then continue on down and we'll find this next route handler which we can essentially think of
        as the absolute catchall inside of our application.
    */
    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

// because heroku server can run many app one one machine,
// we use dynamic port binding form env variables
const PORT = process.env.PORT || 5000; // => for dev will be used 5000 port
app.listen(PORT)