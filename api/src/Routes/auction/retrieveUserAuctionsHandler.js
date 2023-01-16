const { runWithErrorHandling, createLogger, verifyToken } = require('../../utils')
const { auction: { retrieveUserAuctions } } = require('../../logic')
const logger = createLogger(module)

module.exports = (req, res) => {
    runWithErrorHandling(() => {
        const authorId = verifyToken(req)

        return retrieveUserAuctions(authorId)
            .then(auctions => res.status(200).json(auctions))
    }, res, logger)
}