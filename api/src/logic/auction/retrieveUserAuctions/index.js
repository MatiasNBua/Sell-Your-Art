const { User, Auction } = require('../../../models')
const { NotFoundError, SystemError } = require('errors')
const { verifyObjectIdString } = require('../../../utils')

function retrieveUserAuctions(authorId) {
    verifyObjectIdString(authorId, 'authorId')

    return User.findById(authorId).lean()
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(author => {
            if (!author) throw new NotFoundError(`user with id ${authorId} not found`)

            return Auction.find({author},
             "author title description value image finalDate currentValue").lean()
                .catch(error => {
                    throw new SystemError(error.message)
                })
        })
        .then(auctions => {
            auctions.forEach(auction => {
               

                auction.id = auction._id.toString()
                delete auction._id

                delete auction.__v
            })

            return auctions
        })
}

module.exports = retrieveUserAuctions