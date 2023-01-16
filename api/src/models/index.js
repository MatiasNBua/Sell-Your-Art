const { model } = require('mongoose')
const { user, auction, bid, message } = require('./schemas')

module.exports = {
    User: model('User', user),
    Auction: model('Auction', auction),
    Bid: model('Bid', bid),
    Message: model('message', message)
}