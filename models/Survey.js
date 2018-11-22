const mongoose = require('mongoose')
const {Schema} = mongoose
const RecipientSchema = require('./Recipients')

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],
    yes: {type: Number, default: 0},
    no: {type: Number, default: 0},
    dateSent: Date,
    lastResponded: Date,
    // Underscore is not required (and you can choice any name what you are want)
    // But by convention we use this name as ref + undescore
    _user: {type: Schema.Types.ObjectId, ref: 'User'}
})

mongoose.model('surveys', surveySchema)