const { runWithErrorHandling, createLogger, verifyToken  } = require ('../../utils')
const {NotFoundError} = require('errors')

const { messages: { createMessages } } = require('../../logic')

const logger = createLogger(module)

module.exports = ( req, res ) => {
    debugger
    runWithErrorHandling (() => {
            const userId = verifyToken(req)

            const { body: { text }, params: { auctionId } } = req;
            
            return createMessages(userId, auctionId, text)
            .then(() => res.status(201).send()) 
            .catch((error) => {
                if(error instanceof NotFoundError)
                res.status(409).json({ error: error.message });
                else res.status(500).json({ error: "System Error"})
            })
        }, res, logger)
}    