const { User, Message } = require('../../../models')
const { NotFoundError, } = require("errors")
const { verifyObjectIdString } = require("../../../utils");

function retrieveMessages(userId, auctionId) { 
    verifyObjectIdString(userId, 'user id')
    verifyObjectIdString(auctionId, 'user id')

    return User.findById(userId).lean()
       
        .then(user => {
            if(!user) throw new NotFoundError (`User with id: ${userId} doesn't exist`)

        })
        .then(() => {
            return Message.find({ auction: auctionId}).populate({
                path: "user",
            })
        })
}

module.exports = retrieveMessages