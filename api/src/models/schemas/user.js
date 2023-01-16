const { Schema, Types: { ObjectId } } = require('mongoose')

const user = new Schema({
    name:{
        type: String,
        required: true
    },

    lastname:{
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    birth:{
        type: Date,
        required: true
    },

    phoneNumber: {
        type: Number,
    },

    gender: {
        type: String,
        
    },

    city: {
        type: String,
        default: ''
    },

    aboutYou: {
        type: String,
        default: ''
    },

    // BuyAuction: {
    //     type: ObjectId,
    //     ref: 'auction'
    // }
   
})

module.exports = user

       