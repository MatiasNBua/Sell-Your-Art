const { runWithErrorHandling, createLogger, verifyToken  } = require ('../../utils')

const { messages: { createMessage} } = require('../../logic')

const {NotFoundError} = require('errors')
const logger = createLogger(module)

module.exports = ( req, res ) => {
    runWithErrorHandling (() => {
            const userId = verifyToken(req)

            const { body: { text }, params: { auctionId } } = req;
            
            return createMessage()
            .then(() => res.status(201).send()) 
        }, res, logger)
}    