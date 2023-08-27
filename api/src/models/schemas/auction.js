const { Schema, Types: { ObjectId } } = require('mongoose')
const bid = require('./bid')

const auction = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },

    title: {
        type: String,
        requred: true,
        default: ''
    },

    category: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        default: '',
        requred: true,
    },

    value: {
        type: Number,
        required: true
    },

    currentValue: {
        type: Number,
        required: true,
    },

    bids: [bid]
    ,
    image: {
        type: String,
        required: true
    },

    finalDate: {
        type: Date,
        default: Date.now,
        required: true
    },

    initialDate: {
        type: Date,
        default: Date.now,

    },
})

module.exports = auction


// currency: {
//    type: String,
//    enum: ['euro', 'american dollar', 'pound']
// }

