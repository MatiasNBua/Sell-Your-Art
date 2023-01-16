const { runWithErrorHandling, createLogger, verifyToken } = require('../../utils')
const { bid: { createBid } } = require('../../logic')
const logger = createLogger(module)

module.exports = (req, res) => {
    runWithErrorHandling(() => {
        const userId = verifyToken(req)
        
        const { body: { price } , params: { auctionId } } = req

        // body: { auctionId, price, dateBid }
        // body: { userId, price, newDate(dateBid) } , params: { auctionId }
        return createBid( userId, auctionId, price )
            .then(() => res.status(201).send())
    }, res, logger)
}