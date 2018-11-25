const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('surveys')

module.exports = app => {
    app.get(
        '/api/surveys/thanks',
        (req, res) => {
            res.send('Thanks for voting')
        }
    )

    app.get(
        '/api/surveys/webhooks',
        (req, res) => {
            console.log(req.body);
            res.send({})
        }
    )

    app.post(
        '/api/surveys',
        requireLogin,
        requireCredits,
        async (req, res) => {
            const {title, subject, body, recipients} = req.body

            // we can don't add props with specified defaults values
            const survey = new Survey({
                title,
                subject,
                body,
                recipients: recipients.split(',').map(email => ({email: email.trim()})),
                _user: req.user.id,
                dateSent: Date.now()
            })

            const mailer = new Mailer(survey, surveyTemplate(survey))
            try {
                await mailer.send()
                await survey.save()
                req.user.credits -= 1
                const user = await req.user.save()
                res.send(user) // Just for update user model inside auth reducer
            } catch (err) {
                // 422 - unprocessable entity
                res.status(422).send(err)
            }
        })
}