const { runWithErrorHandling, createLogger, verifyToken } = require('../../utils')
const { auction: { retrieveAuction } } = require('../../logic')
const logger = createLogger(module)

module.exports = (req, res) => {
    runWithErrorHandling(() => {
        const userId = verifyToken(req)

        return retrieveAuction(userId)
            .then(auctions => res.status(200).json(auctions))
    }, res, logger)
}