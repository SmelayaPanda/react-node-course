// For using relative path in the code:
// Proxy copied whole response object and resend to the target path (if it specified for this request)
// With this way we can make all requests to client CRA server (3000, and nothing for 5000)

const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(proxy('/auth/google', { target: 'http://localhost:5000' }))
}
