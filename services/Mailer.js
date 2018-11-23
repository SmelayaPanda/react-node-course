const sendgrid = require('sendgrid')
const helper = sendgrid.mail
const keys = require('../config/keys')

class Mailer extends helper.Mail {
    constructor({subject, recipients}, content) {
        super()

        this.sgApi = sendgrid(keys.sendGridKey)
        this.from_email = new helper.Mail('smelayapandagm@gmail.com')
        this.subject = subject
        this.body = new helper.Content('text/html', content)
        this.recipients = this.formatAddresses(recipients)

        this.addContent(this.body)
        this.addClickTracking()
        this.addRecipients()
    }

    formatAddresses(recipients) {
        return recipients.map(({mail}) => new helper.Mail(mail))
    }

    addClickTracking() {
        const trackSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true)

        trackSettings.setClickTracking(clickTracking)
        this.addTrackingSettings(trackSettings)
    }

    addRecipients() {
        const personalize = new helper.Personalization()
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient)
        })
        this.addPersonalization(personalize)
    }

    async send() {
        console.log(this);
        const req = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        })

        return this.sgApi.API(req)
    }
}

module.exports = Mailer