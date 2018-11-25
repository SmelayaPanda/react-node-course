const _ = require('lodash')
const {Path} = require('path-parser')
const {URL} = require('url')
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('surveys')

module.exports = app => {
    app.get(
        '/api/surveys',
        requireLogin,
        async (req, res) => {
            const surveys = await Survey
                .find({_user: req.user.id})
                .select({recipients: false}) // here 1/true - include this prop to result, 0/false - exclude prop

            res.send(surveys)
        }
    )

    app.get(
        '/api/surveys/:surveyId/:choice',
        (req, res) => {
            res.send('Thanks for voting!')
        }
    )

    app.post(
        '/api/surveys/webhooks', // listen sendgrid events API (https://app.sendgrid.com/settings/mail_settings)
        (req, res) => {
            const p = new Path('/api/surveys/:surveyId/:choice')
            _.chain(req.body)
                .map(({email, url}) => {
                    const match = p.test(new URL(url).pathname)
                    if (match) {
                        return {email, surveyId: match.surveyId, choice: match.choice}
                    }
                })
                .compact()
                .uniqBy('email', 'surveyId')
                .each(({surveyId, email, choice}) => {
                    Survey.updateOne(
                        // found object
                        {
                            _id: surveyId,
                            recipients: {
                                $elemMatch: { // mongo sub-document collection el match
                                    email: email, responded: false
                                }
                            }
                        },
                        // Update founded object data
                        {
                            $inc: { // mongo operator - increment
                                [choice]: 1
                            },
                            $set: {
                                // look sub-document collection "recipients" and set responded to true
                                // here $ === $elemMatch founded above
                                'recipients.$.responded': true
                            },
                            lastResponded: new Date()
                        }
                    ).exec() // execute query!
                })
                .value()

            res.send({})
        })

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

            // Great place to send an email!
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