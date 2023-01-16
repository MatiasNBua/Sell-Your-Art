const { runWithErrorHandling, createLogger, verifyToken } = require('../../utils')
const { auction: { createAuction } } = require('../../logic')
const logger = createLogger(module)

module.exports = (req, res) => {
    runWithErrorHandling(() => {
        const userId = verifyToken(req)
        
        
        const { body: { title, description, value, image, finalDate} } = req

        return createAuction( userId, title, description, value, image, new Date(finalDate) )
            .then(() => res.status(201).send())
    }, res, logger)
}