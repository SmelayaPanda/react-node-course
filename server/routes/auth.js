const passport = require('passport')

module.exports = (app) => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );


    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys')
        }
    )

    app.get(
        '/api/logout',
        (req, res) => {
            req.logout() // logout it is a function automatically attached to request object by passport
            res.redirect('/')
        }
    )

    app.get(
        '/api/current_user',
        (req, res) => {
            // res.send(req.session)
            // console.log(req);
            res.send(req.user)
        }
    )
}