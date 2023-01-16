const { Schema, Types: { ObjectId } } = require('mongoose')

const message = new Schema({
    user: {
        type: ObjectId,
        required: true,
    },

    auction:{
        type: ObjectId,
        require: true
    },

    text:{
        type: String,
        required: true,
    },

    sendAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = message