const express = require('express');
require('./services/passport')

// inside one node app can be several app instances
const app = express();
require('./routes/auth')(app)



// because heroku server can run many app one one machine,
// we use dynamic port binding form env variables
const PORT = process.env.PORT || 5000; // => for dev will be used 5000 port
app.listen(PORT)