const { Message, Auction, User } = require ('../../../models')
const { validateString } = require ('validators')
const { verifyObjectIdString } = require ('../../../utils')

const { SystemError, NotFoundError } = require('errors');
// const { auction } = require('../..');

function createMessage(userId, auctionId, text) {
    verifyObjectIdString(userId, "user id");
    verifyObjectIdString(auctionId, "auction id")
    validateString(text, "text");

    return User.findById(userId).lean()
    .catch((error) => {
        throw new SystemError(error.message)
    })
    .then((user) => {
        if (!user) throw new NotFoundError(`user with id ${userId} not found`)

        return (
            Auction.find({"portions.owner": userId})
            .lean()
            .catch((error) =>{
                throw new SystemError(error.message);
            })
        )
    })

    .then((auctions) => {
        if(!auctions) throw new NotFoundError(`user with id ${userId} has not properties`)
    
        auctions.forEach((auction) => {
            auction.id = auction._id.toString();

            delete auction._id

            delete auction.__v
        })

        return Message.create({
            user: userId,
            auction: auctionId,
            text,
        }).catch((error) => {
            throw new SystemError(error.message)
        })
    })
}

module.exports = createMessage