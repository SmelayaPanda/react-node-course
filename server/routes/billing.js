const keys =  require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)

module.exports = app => {
    app.post(
        '/api/stripe',
        async (req, res) => {
            if (!req.user) {
                // 401 - unauthorized or forbidden
                return res.status(401).send({error: 'You must login!'})
            }

            const charge = await stripe.charges.create({
                amount: 500,
                currency: 'usd',
                description: '$5 for 5 credits',
                source: req.body.id
            })

            console.log(charge);
            // req.user - attached to request object automatically by passport
            req.user.credits += 5
            const user = await req.user.save()
            res.send(user)
        }
    )
}