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


// because heroku server can run many app one one machine,
// we use dynamic port binding form env variables
const PORT = process.env.PORT || 5000; // => for dev will be used 5000 port
app.listen(PORT)